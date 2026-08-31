import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { usePremium } from '@/context/PremiumContext';

export function SynthesisScreen() {
  const { isPremium } = usePremium();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🧬</Text>
        <Text style={styles.title}>Synthesis</Text>
        <Text style={styles.subtitle}>AI-powered asset strategy</Text>
      </View>

      {isPremium ? (
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Top Opportunity</Text>
            <Text style={styles.cardDesc}>
              Based on your assets, your fastest path to income is renting your vehicle on Turo.
              With an estimated value of $28,000, you could earn $500-1500/month.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick Wins</Text>
            <Text style={styles.cardDesc}>
              1. List your truck on Turo this week{'\n'}
              2. Sign up for DoorDash for weekend deliveries{'\n'}
              3. Rent your camera kit on Fat Llama
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Long-Term Strategy</Text>
            <Text style={styles.cardDesc}>
              Build a content brand around your skills. Your YouTube channel is close to
              monetization — focus on consistent uploads and affiliate partnerships.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.locked}>
          <Text style={styles.lockEmoji}>🔒</Text>
          <Text style={styles.lockTitle}>Premium Feature</Text>
          <Text style={styles.lockDesc}>
            AI Synthesis analyzes your entire vault and generates a personalized
            income strategy. Upgrade to Premium to unlock.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { alignItems: 'center', paddingVertical: 32 },
  emoji: { fontSize: 48 },
  title: { color: '#F1F5F9', fontSize: 26, fontWeight: '900', marginTop: 8 },
  subtitle: { color: '#64748B', fontSize: 14, marginTop: 4 },
  content: { padding: 20 },
  card: { backgroundColor: '#1E293B', borderRadius: 16, padding: 20, marginBottom: 16 },
  cardTitle: { color: '#2DD4BF', fontSize: 16, fontWeight: '700', marginBottom: 8 },
  cardDesc: { color: '#CBD5E1', fontSize: 14, lineHeight: 22 },
  locked: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  lockEmoji: { fontSize: 48, marginBottom: 16 },
  lockTitle: { color: '#F1F5F9', fontSize: 22, fontWeight: '700' },
  lockDesc: { color: '#64748B', fontSize: 14, textAlign: 'center', marginTop: 8, lineHeight: 20 },
});
