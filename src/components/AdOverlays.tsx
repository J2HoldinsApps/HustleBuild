import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePremium } from '@/context/PremiumContext';

export function AdOverlays({ children }: { children: React.ReactNode }) {
  const { isPremium } = usePremium();

  return (
    <View style={styles.container}>
      {children}
      {!isPremium && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Ad-Free with Premium</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    backgroundColor: '#334155',
    paddingVertical: 4,
    alignItems: 'center',
  },
  bannerText: {
    color: '#94A3B8',
    fontSize: 11,
  },
});
