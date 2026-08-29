import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';
import { usePremium } from '@/context/PremiumContext';
import { ASSET_WEIGHTS } from '@/data/assets';
import { BannerAd } from '@/components/BannerAd';

export function ProfileScreen({ navigation }: any) {
  const { isPremium } = usePremium();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }
    setUser(user);

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    setProfile(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            navigation.replace('Auth');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.noUserText}>You are not signed in.</Text>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.replace('Auth')}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <BannerAd premium={isPremium} />
      </View>
    );
  }

  const assets = profile?.assets || [];
  const vaultLevel = assets.length;
  const potentialRate = Number(profile?.potential_rate) || 15.0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.email?.[0]?.toUpperCase() || 'H'}
            </Text>
          </View>
          <Text style={styles.userEmail}>{user.email}</Text>
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>👑 PREMIUM</Text>
            </View>
          )}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{vaultLevel}</Text>
            <Text style={styles.statLabel}>Vault Level</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${potentialRate.toFixed(0)}</Text>
            <Text style={styles.statLabel}>$/hr Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{Object.keys(ASSET_WEIGHTS).length}</Text>
            <Text style={styles.statLabel}>Total Assets</Text>
          </View>
        </View>

        {/* Selected Assets */}
        <Text style={styles.sectionTitle}>YOUR ARSENAL</Text>
        {assets.length > 0 ? (
          <View style={styles.assetsGrid}>
            {assets.map((asset: string) => (
              <View key={asset} style={styles.assetPill}>
                <Text style={styles.assetPillText}>{asset}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>
            No assets selected yet. Visit the Vault to build your arsenal.
          </Text>
        )}

        {/* Subscription Status */}
        <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionStatus}>
            {isPremium ? 'Premium Member' : 'Free Tier'}
          </Text>
          <Text style={styles.subscriptionDesc}>
            {isPremium
              ? 'You have unlimited access to all features.'
              : 'Upgrade to unlock unlimited blueprints and remove ads.'}
          </Text>
          {!isPremium && (
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={() => navigation.navigate('Premium')}
            >
              <Text style={styles.upgradeText}>Upgrade to Premium</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
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
    padding: 20,
    paddingBottom: 40,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#64748B',
    fontSize: 16,
  },
  noUserText: {
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#2DD4BF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  signInText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2DD4BF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#0F172A',
    fontSize: 32,
    fontWeight: '900',
  },
  userEmail: {
    color: '#F1F5F9',
    fontSize: 16,
    fontWeight: '600',
  },
  premiumBadge: {
    marginTop: 8,
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2DD4BF',
  },
  premiumBadgeText: {
    color: '#2DD4BF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statValue: {
    color: '#2DD4BF',
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#2DD4BF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  assetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 32,
  },
  assetPill: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2DD4BF',
  },
  assetPillText: {
    color: '#2DD4BF',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
    marginBottom: 32,
    lineHeight: 20,
  },
  subscriptionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  subscriptionStatus: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subscriptionDesc: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  upgradeButton: {
    backgroundColor: '#2DD4BF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  upgradeText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
  },
});
