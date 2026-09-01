import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import { usePremium } from '@/context/PremiumContext';
import { useDemo } from '@/context/DemoContext';

export function ProfileScreen({ navigation }: any) {
  const { isPremium } = usePremium();
  const { demoMode } = useDemo();

  const handleExit = () => {
    if (demoMode) {
      Alert.alert('Exit Demo', 'You will need to refresh the page to re-enter demo mode.', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            if (typeof window !== 'undefined') {
              window.location.reload();
            }
          },
        },
      ]);
      return;
    }

    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => supabase.auth.signOut(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
        <Text style={styles.title}>Profile</Text>
        {isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>👑 PREMIUM</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Membership</Text>
            <Text style={styles.rowValue}>{isPremium ? 'Premium' : 'Free'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Mode</Text>
            <Text style={styles.rowValue}>{demoMode ? 'Demo' : 'Signed In'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Version</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Made with</Text>
            <Text style={styles.rowValue}>HustleBuild</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleExit}>
        <Text style={styles.signOutText}>{demoMode ? 'Exit Demo' : 'Sign Out'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', padding: 20 },
  header: { alignItems: 'center', paddingVertical: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarEmoji: { fontSize: 36 },
  title: { color: '#F1F5F9', fontSize: 24, fontWeight: '800' },
  premiumBadge: { marginTop: 8, backgroundColor: '#064E3B', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  premiumBadgeText: { color: '#2DD4BF', fontSize: 12, fontWeight: '700' },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#64748B', fontSize: 13, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' },
  card: { backgroundColor: '#1E293B', borderRadius: 16, padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  rowLabel: { color: '#94A3B8', fontSize: 15 },
  rowValue: { color: '#F1F5F9', fontSize: 15, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#334155' },
  signOutButton: { backgroundColor: '#1E293B', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 'auto' },
  signOutText: { color: '#EF4444', fontSize: 16, fontWeight: '700' },
});
