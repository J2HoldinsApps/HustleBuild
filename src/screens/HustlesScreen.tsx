import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';
import { HUSTLE_DATABASE, Hustle } from '@/data/assets';
import { usePremium } from '@/context/PremiumContext';
import { BannerAd } from '@/components/BannerAd';

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: '#22C55E',
  Medium: '#F59E0B',
  Hard: '#EF4444',
};

export function HustlesScreen({ navigation }: any) {
  const { isPremium } = usePremium();
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('assets')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setSelectedAssets(data.assets || []);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProfile();
    setRefreshing(false);
  };

  // Match hustles based on selected assets
  const matchedHustles = HUSTLE_DATABASE.filter((hustle) =>
    hustle.requiredAssets.some((asset) => selectedAssets.includes(asset))
  ).sort((a, b) => {
    // Sort by number of matching assets (best matches first)
    const aMatches = a.requiredAssets.filter((a) => selectedAssets.includes(a)).length;
    const bMatches = b.requiredAssets.filter((b) => selectedAssets.includes(b)).length;
    return bMatches - aMatches;
  });

  const otherHustles = HUSTLE_DATABASE.filter(
    (hustle) => !matchedHustles.includes(hustle)
  );

  const renderHustleCard = (hustle: Hustle, isMatched: boolean) => {
    const matchCount = hustle.requiredAssets.filter((a) =>
      selectedAssets.includes(a)
    ).length;

    return (
      <View
        key={hustle.id}
        style={[styles.hustleCard, isMatched && styles.hustleCardMatched]}
      >
        {isMatched && matchCount > 0 && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchBadgeText}>
              {matchCount} asset match
            </Text>
          </View>
        )}
        <View style={styles.hustleHeader}>
          <Text style={styles.hustleCategory}>{hustle.category}</Text>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: DIFFICULTY_COLORS[hustle.difficulty] + '20' },
            ]}
          >
            <Text
              style={[
                styles.difficultyText,
                { color: DIFFICULTY_COLORS[hustle.difficulty] },
              ]}
            >
              {hustle.difficulty}
            </Text>
          </View>
        </View>

        <Text style={styles.hustleTitle}>{hustle.title}</Text>
        <Text style={styles.hustleDescription}>{hustle.description}</Text>

        <View style={styles.hustleFooter}>
          <View>
            <Text style={styles.rateLabel}>EARNING POTENTIAL</Text>
            <Text style={styles.rateValue}>{hustle.rateRange}</Text>
          </View>
          <View style={styles.assetsRow}>
            {hustle.requiredAssets.map((asset) => (
              <View
                key={asset}
                style={[
                  styles.assetTag,
                  selectedAssets.includes(asset) && styles.assetTagActive,
                ]}
              >
                <Text
                  style={[
                    styles.assetTagText,
                    selectedAssets.includes(asset) && styles.assetTagTextActive,
                  ]}
                >
                  {asset}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2DD4BF" />
        }
      >
        <Text style={styles.screenTitle}>YOUR HUSTLE BLUEPRINTS</Text>
        <Text style={styles.screenSubtext}>
          {matchedHustles.length > 0
            ? `${matchedHustles.length} matched hustles based on your arsenal`
            : 'Select assets in the Vault to see matched hustles'}
        </Text>

        {matchedHustles.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>MATCHED FOR YOU</Text>
            {matchedHustles.map((h) => renderHustleCard(h, true))}
          </>
        )}

        {otherHustles.length > 0 && (
          <>
            <Text style={styles.sectionHeader}>EXPLORE MORE</Text>
            {otherHustles.map((h) => renderHustleCard(h, false))}
          </>
        )}
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
    padding: 20,
    paddingBottom: 40,
  },
  screenTitle: {
    color: '#F1F5F9',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
  screenSubtext: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 24,
  },
  sectionHeader: {
    color: '#2DD4BF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginTop: 8,
  },
  hustleCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  hustleCardMatched: {
    borderColor: '#2DD4BF',
    backgroundColor: '#1A2E3A',
  },
  matchBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#2DD4BF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  matchBadgeText: {
    color: '#0F172A',
    fontSize: 10,
    fontWeight: '700',
  },
  hustleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hustleCategory: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
  },
  hustleTitle: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  hustleDescription: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  hustleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 12,
  },
  rateLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  rateValue: {
    color: '#2DD4BF',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 2,
  },
  assetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    maxWidth: '50%',
    justifyContent: 'flex-end',
  },
  assetTag: {
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 2,
  },
  assetTagActive: {
    backgroundColor: '#2DD4BF',
  },
  assetTagText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
  },
  assetTagTextActive: {
    color: '#0F172A',
  },
});
