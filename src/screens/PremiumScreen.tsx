import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { usePremium } from '@/context/PremiumContext';
import { getOfferings, purchasePackage, restorePurchases } from '@/lib/revenuecat';
import { SUBSCRIPTION_PACKAGES, SubscriptionPackage } from '@/data/assets';
import { BannerAd } from '@/components/BannerAd';

export function PremiumScreen({ navigation }: any) {
  const { isPremium, setIsPremium } = usePremium();
  const [packages, setPackages] = useState<SubscriptionPackage[]>(SUBSCRIPTION_PACKAGES);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const offerings = await getOfferings();
      setPackages(offerings);
      setLoading(false);
    })();
  }, []);

  const handlePurchase = async (pkg: SubscriptionPackage) => {
    setPurchasing(true);
    setSelectedId(pkg.identifier);
    try {
      const success = await purchasePackage(pkg.identifier);
      if (success) {
        setIsPremium(true);
        Alert.alert('Welcome to Premium!', 'You now have unlimited access to all features.');
      }
    } catch (e: any) {
      Alert.alert('Purchase Failed', e.message || 'Something went wrong. Please try again.');
    } finally {
      setPurchasing(false);
      setSelectedId(null);
    }
  };

  const handleRestore = async () => {
    try {
      const restored = await restorePurchases();
      if (restored) {
        setIsPremium(true);
        Alert.alert('Purchases Restored', 'Your premium subscription has been restored.');
      } else {
        Alert.alert('No Purchases Found', 'We could not find any previous purchases.');
      }
    } catch {
      Alert.alert('Restore Failed', 'Something went wrong. Please try again.');
    }
  };

  if (isPremium) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.activePremiumCard}>
            <Text style={styles.crownIcon}>👑</Text>
            <Text style={styles.activeTitle}>PREMIUM ACTIVE</Text>
            <Text style={styles.activeSubtext}>
              You have unlimited access to all HustleBuild features
            </Text>
            <View style={styles.featuresList}>
              <Text style={styles.featureItem}>✓  Unlimited hustle blueprints</Text>
              <Text style={styles.featureItem}>✓  No ads experience</Text>
              <Text style={styles.featureItem}>✓  Advanced gig matching</Text>
              <Text style={styles.featureItem}>✓  Market demand analytics</Text>
              <Text style={styles.featureItem}>✓  Priority new hustle alerts</Text>
            </View>
          </View>
        </ScrollView>
        <BannerAd premium={isPremium} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.crownIcon}>👑</Text>
          <Text style={styles.headerTitle}>HUSTLEBUILD PREMIUM</Text>
          <Text style={styles.headerSubtext}>
            Unlock unlimited hustle blueprints, remove ads, and get exclusive features
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2DD4BF" style={styles.loader} />
        ) : (
          <>
            {packages.map((pkg) => (
              <TouchableOpacity
                key={pkg.identifier}
                onPress={() => handlePurchase(pkg)}
                disabled={purchasing}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.packageCard,
                    pkg.highlight && styles.packageCardHighlight,
                  ]}
                >
                  {pkg.highlight && (
                    <View style={styles.bestValueBadge}>
                      <Text style={styles.bestValueText}>BEST VALUE</Text>
                    </View>
                  )}
                  <View style={styles.packageHeader}>
                    <Text style={styles.packageTitle}>{pkg.title}</Text>
                    <Text style={styles.packagePrice}>
                      {pkg.price}
                      <Text style={styles.packagePeriod}>{pkg.period}</Text>
                    </Text>
                  </View>
                  <View style={styles.featuresList}>
                    {pkg.features.map((feature, i) => (
                      <Text key={i} style={styles.featureItem}>✓  {feature}</Text>
                    ))}
                  </View>
                  <View style={styles.ctaButton}>
                    {purchasing && selectedId === pkg.identifier ? (
                      <ActivityIndicator color="#0F172A" />
                    ) : (
                      <Text style={styles.ctaText}>Subscribe</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={handleRestore} disabled={purchasing}>
              <Text style={styles.restoreText}>Restore Purchases</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current period. Manage in your account settings.
            </Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 12,
  },
  crownIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  headerTitle: {
    color: '#F1F5F9',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  headerSubtext: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  loader: {
    marginTop: 40,
  },
  packageCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  packageCardHighlight: {
    borderColor: '#2DD4BF',
    backgroundColor: '#1A2E3A',
  },
  bestValueBadge: {
    position: 'absolute',
    top: -10,
    left: 24,
    backgroundColor: '#2DD4BF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  bestValueText: {
    color: '#0F172A',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  packageTitle: {
    color: '#F1F5F9',
    fontSize: 20,
    fontWeight: '700',
  },
  packagePrice: {
    color: '#2DD4BF',
    fontSize: 24,
    fontWeight: '900',
  },
  packagePeriod: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  featuresList: {
    gap: 8,
    marginBottom: 20,
  },
  featureItem: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: '#2DD4BF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
  },
  restoreText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  disclaimer: {
    color: '#475569',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
  },
  activePremiumCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2DD4BF',
    marginTop: 20,
  },
  activeTitle: {
    color: '#2DD4BF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
  },
  activeSubtext: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
});
