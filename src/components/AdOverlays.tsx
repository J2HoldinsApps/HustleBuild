import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { usePremium } from '@/context/PremiumContext';

// Interstitial Ad Overlay — shown when triggered by an action
export function InterstitialAdOverlay({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { isPremium } = usePremium();

  if (isPremium) return null;

  return (
    <Modal visible={visible} transparent={false} animationType="fade">
      <View style={styles.container}>
        <View style={styles.adContent}>
          <Text style={styles.label}>Advertisement</Text>
          <View style={styles.adBody}>
            <Text style={styles.adTitle}>Full-Screen Ad</Text>
            <Text style={styles.adSubtext}>Google AdMob Interstitial</Text>
            <ActivityIndicator size="large" color="#2DD4BF" style={styles.spinner} />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Skip Ad</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Rewarded Ad Overlay — shown before revealing hustle blueprints
export function RewardedAdOverlay({
  visible,
  onClose,
  onReward,
}: {
  visible: boolean;
  onClose: () => void;
  onReward: () => void;
}) {
  const { isPremium } = usePremium();

  if (isPremium) return null;

  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <View style={styles.container}>
        <View style={styles.adContent}>
          <Text style={styles.label}>Sponsored</Text>
          <View style={styles.adBody}>
            <Text style={styles.adTitle}>Rewarded Video</Text>
            <Text style={styles.adSubtext}>Watch to unlock your Blueprint</Text>
            <ActivityIndicator size="large" color="#2DD4BF" style={styles.spinner} />
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              onReward();
              onClose();
            }}
          >
            <Text style={styles.closeText}>Claim Reward</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adContent: {
    width: '85%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  label: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  adBody: {
    alignItems: 'center',
    paddingVertical: 32,
  width: '100%',
  },
  adTitle: {
    color: '#F1F5F9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  adSubtext: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 24,
  },
  spinner: {
    marginTop: 16,
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: '#2DD4BF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
});
