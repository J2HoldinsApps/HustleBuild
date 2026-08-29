import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

// Web/preview implementation of the banner ad
// Shows a simulated banner placeholder on web
export function BannerAd({ premium = false }: { premium?: boolean }) {
  if (premium) return null;

  return (
    <View style={styles.webBanner}>
      <Text style={styles.webBannerText}>Google AdMob Banner Ad</Text>
      <Text style={styles.webBannerSubtext}>320x50 — Test Ad Unit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webBanner: {
    backgroundColor: '#1E293B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    height: 50,
  },
  webBannerText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  webBannerSubtext: {
    color: '#475569',
    fontSize: 10,
  },
});
