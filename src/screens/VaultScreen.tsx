import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';
import { ASSET_WEIGHTS, ASSET_ICONS } from '@/data/assets';
import { usePremium } from '@/context/PremiumContext';
import { BannerAd } from '@/components/BannerAd';

const BASE_RATE = 15.0;

export function VaultScreen({ navigation }: any) {
  const { isPremium } = usePremium();
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [potentialRate, setPotentialRate] = useState(BASE_RATE);
  const [loading, setLoading] = useState(true);
  const fadeAnims = React.useRef<Record<string, Animated.Value>>({});

  // Initialize fade animations for each asset
  Object.keys(ASSET_WEIGHTS).forEach((asset) => {
    if (!fadeAnims.current[asset]) {
      fadeAnims.current[asset] = new Animated.Value(0);
    }
  });

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('assets, potential_rate')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setSelectedAssets(data.assets || []);
      setPotentialRate(Number(data.potential_rate) || BASE_RATE);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const toggleAsset = async (asset: string) => {
    let newAssets: string[];
    let newRate: number;

    setSelectedAssets((prev) => {
      if (prev.includes(asset)) {
        newAssets = prev.filter((a) => a !== asset);
        newRate = potentialRate - ASSET_WEIGHTS[asset];
      } else {
        newAssets = [...prev, asset];
        newRate = potentialRate + ASSET_WEIGHTS[asset];
      }
      setPotentialRate(newRate);
      return newAssets;
    });

    // Animate the card
    Animated.timing(fadeAnims.current[asset], {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start(() => fadeAnims.current[asset].setValue(0));

    // Save to Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        assets: newAssets!,
        vault_level: newAssets!.length,
        potential_rate: newRate!,
      });
    }
  };

  const progressValue = Math.min(potentialRate / 150, 1);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Gamified Meter */}
        <View style={styles.meterContainer}>
          <View style={styles.meterGradient}>
            <Text style={styles.meterLabel}>POTENTIAL HOURLY RATE</Text>
            <Text style={styles.meterValue}>${potentialRate.toFixed(2)}</Text>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressFill,
                  { width: `${progressValue * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.meterSubtext}>
              {selectedAssets.length} assets selected
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select your Arsenal</Text>
        <Text style={styles.sectionSubtext}>
          Tap the assets you own to calculate your earning potential
        </Text>

        {/* Asset List */}
        <View style={styles.assetList}>
          {Object.entries(ASSET_WEIGHTS).map(([asset, weight]) => {
            const isSelected = selectedAssets.includes(asset);
            return (
              <TouchableOpacity
                key={asset}
                onPress={() => toggleAsset(asset)}
                activeOpacity={0.7}
              >
                <Animated.View
                  style={[
                    styles.assetCard,
                    isSelected && styles.assetCardSelected,
                  ]}
                >
                  <View style={styles.assetLeft}>
                    <Text style={styles.assetIcon}>{ASSET_ICONS[asset]}</Text>
                    <View>
                      <Text
                        style={[
                          styles.assetName,
                          isSelected && styles.assetNameSelected,
                        ]}
                      >
                        {asset}
                      </Text>
                      <Text style={styles.assetWeight}>+${weight.toFixed(0)}/hr</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.checkCircle,
                      isSelected && styles.checkCircleActive,
                    ]}
                  >
                    <Text style={styles.checkIcon}>
                      {isSelected ? '✓' : '+'}
                    </Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Find Hustles Button */}
        <TouchableOpacity
          style={[
            styles.findButton,
            selectedAssets.length === 0 && styles.findButtonDisabled,
          ]}
          disabled={selectedAssets.length === 0}
          onPress={() => {
            if (isPremium) {
              navigation.navigate('Hustles');
            } else {
              navigation.navigate('Synthesis');
            }
          }}
        >
          <Text style={styles.findButtonText}>FIND HUSTLES</Text>
        </TouchableOpacity>
      </ScrollView>

      <BannerAd premium={isPremium} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  meterContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  meterGradient: {
    backgroundColor: '#1E293B',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2DD4BF',
  },
  meterLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  meterValue: {
    color: '#2DD4BF',
    fontSize: 48,
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2DD4BF',
    borderRadius: 4,
  },
  meterSubtext: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  sectionSubtext: {
    color: '#64748B',
    fontSize: 13,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  assetList: {
    paddingHorizontal: 20,
  },
  assetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  assetCardSelected: {
    borderColor: '#2DD4BF',
    backgroundColor: '#1A2E3A',
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assetIcon: {
    fontSize: 28,
  },
  assetName: {
    color: '#CBD5E1',
    fontSize: 16,
    fontWeight: '600',
  },
  assetNameSelected: {
    color: '#F1F5F9',
  },
  assetWeight: {
    color: '#2DD4BF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#475569',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleActive: {
    borderColor: '#2DD4BF',
    backgroundColor: '#2DD4BF',
  },
  checkIcon: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '700',
  },
  findButton: {
    margin: 20,
    backgroundColor: '#2DD4BF',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  findButtonDisabled: {
    backgroundColor: '#334155',
  },
  findButtonText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
