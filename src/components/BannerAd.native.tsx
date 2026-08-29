import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TestIds, BannerView } from 'react-native-google-mobile-ads';
import { ADMOB_BANNER_ID } from '@/config';

// Native implementation of the banner ad using react-native-google-mobile-ads
export function BannerAd({ premium = false }: { premium?: boolean }) {
  if (premium) return null;

  return (
    <BannerView
      adUnitId={ADMOB_BANNER_ID}
      size="320x50"
      requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      style={styles.nativeBanner}
    />
  );
}

const styles = StyleSheet.create({
  nativeBanner: {
    height: 50,
    width: '100%',
  },
});
