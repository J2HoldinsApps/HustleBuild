import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { usePremium } from '@/context/PremiumContext';
import { purchasePremium, restorePurchases } from '@/lib/revenuecat';

export function PremiumScreen() {
  const { isPremium, setIsPremium, loading } = usePremium();

  const handlePurchase = async () => {
    const success = await purchasePremium();
    if (success) {
      setIsPremium(true);
      Alert.alert('Premium Activated', 'Enjoy ad-free HustleBuild!');
    }
  };

  const handleRestore = async () => {
    const success = await restorePurchases();
    if (success) {
      setIsPremium(true);
      Alert.alert('Purchases Restored', 'Your premium subscription is active!');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (isPremium) {
    return (
      <View style={styles.container}>
        <View style={styles.premiumActive}>
          <Text style={styles.crownEmoji}>👑</Text>
          <Text style={styles.premiumTitle}>You're Premium!</Text>
          <Text style={styles.premiumDesc}>
            Enjoy ad-free browsing, unlimited assets, and exclusive hustle ideas.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.crownEmoji}>👑</Text>
        <Text style={styles.heroTitle}>HustleBuild Premium</Text>
        <Text style={styles.heroDesc}>Unlock the full power of your assets</Text>
      </View>

      <View style={styles.features}>
        <FeatureItem icon="🚫" title="Ad-Free Experience" desc="No banner or interstitial ads" />
        <FeatureItem icon="♾️" title="Unlimited Assets" desc="Add as many assets as you want" />
        <FeatureItem icon="🔥" title="Exclusive Hustle Ideas" desc="Premium-only income strategies" />
        <FeatureItem icon="📊" title="Advanced Analytics" desc="Track your hustle income" />
      </View>

      <View style={styles.pricing}>
        <View style={styles.priceCard}>
          <Text style={styles.priceTitle}>Monthly</Text>
          <Text style={styles.priceValue}>$4.99</Text>
          <Text style={styles.pricePeriod}>per month</Text>
        </View>
        <View style={[styles.priceCard, styles.priceCardBest]}>
          <Text style={styles.bestValue}>BEST VALUE</Text>
          <Text style={styles.priceTitle}>Yearly</Text>
          <Text style={styles.priceValue}>$29.99</Text>
          <Text style={styles.pricePeriod}>per year (save 50%)</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.ctaButton} onPress={handlePurchase}>
        <Text style={styles.ctaText}>Start Free Trial</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRestore}>
        <Text style={styles.restoreText}>Restore Purchases</Text>
      </TouchableOpacity>
    </View>
  );
}

function FeatureItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureInfo}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  loadingText: { color: '#64748B', fontSize: 16, textAlign: 'center', marginTop: 40 },
  hero: { alignItems: 'center', paddingVertical: 32 },
  crownEmoji: { fontSize: 56 },
  heroTitle: { color: '#F1F5F9', fontSize: 26, fontWeight: '900', marginTop: 12 },
  heroDesc: { color: '#64748B', fontSize: 14, marginTop: 4 },
  features: { marginBottom: 24 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  featureIcon: { fontSize: 28, marginRight: 16 },
  featureInfo: { flex: 1 },
  featureTitle: { color: '#F1F5F9', fontSize: 16, fontWeight: '700' },
  featureDesc: { color: '#64748B', fontSize: 13, marginTop: 2 },
  pricing: { flexDirection: 'row', marginBottom: 24 },
  priceCard: { flex: 1, backgroundColor: '#1E293B', borderRadius: 16, padding: 20, alignItems: 'center', marginRight: 8, borderWidth: 1, borderColor: '#334155' },
  priceCardBest: { borderColor: '#2DD4BF', backgroundColor: '#0F2A2A' },
  bestValue: { color: '#2DD4BF', fontSize: 10, fontWeight: '800', marginBottom: 8 },
  priceTitle: { color: '#94A3B8', fontSize: 14, fontWeight: '600' },
  priceValue: { color: '#F1F5F9', fontSize: 32, fontWeight: '900', marginVertical: 4 },
  pricePeriod: { color: '#64748B', fontSize: 12 },
  ctaButton: { backgroundColor: '#2DD4BF', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  ctaText: { color: '#0F172A', fontSize: 18, fontWeight: '800' },
  restoreText: { color: '#64748B', fontSize: 14, textAlign: 'center' },
  premiumActive: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  premiumTitle: { color: '#2DD4BF', fontSize: 24, fontWeight: '900', marginTop: 16 },
  premiumDesc: { color: '#94A3B8', fontSize: 14, textAlign: 'center', marginTop: 8, paddingHorizontal: 40 },
});
