import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ADMOB_BANNER_ID } from '@/config';
// @ts-ignore — native-only import
import { BannerAd as RNBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

export function BannerAd() {
  return (
    <View style={styles.container}>
      <RNBannerAd
        unitId={ADMOB_BANNER_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1E293B',
  },
});
