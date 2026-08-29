// Native implementation of AdMob using react-native-google-mobile-ads
import { Platform } from 'react-native';
import { ADMOB_INTERSTITIAL_ID, ADMOB_REWARDED_ID } from '@/config';

let interstitialAd: any = null;
let rewardedAd: any = null;

export async function loadInterstitial(): Promise<void> {
  try {
    const mobileAds = require('react-native-google-mobile-ads').default;
    await mobileAds().initialize();
    interstitialAd = mobileAds().createInterstitialAd(ADMOB_INTERSTITIAL_ID, {
      requestNonPersonalizedAdsOnly: true,
    });
  } catch {
    // fall back silently
  }
}

export async function showInterstitial(): Promise<void> {
  try {
    if (interstitialAd) {
      await interstitialAd.show();
    }
  } catch {
    // no-op
  }
}

export async function loadRewarded(): Promise<void> {
  try {
    const mobileAds = require('react-native-google-mobile-ads').default;
    await mobileAds().initialize();
    rewardedAd = mobileAds().createRewardedAd(ADMOB_REWARDED_ID, {
      requestNonPersonalizedAdsOnly: true,
    });
  } catch {
    // fall back silently
  }
}

export async function showRewarded(): Promise<boolean> {
  try {
    if (rewardedAd) {
      return new Promise<boolean>((resolve) => {
        rewardedAd.addAdEventListener(({ type }: any) => {
          if (type === 'rewarded') resolve(true);
          else if (type === 'closed') resolve(false);
        });
        rewardedAd.show();
      });
    }
  } catch {
    // no-op
  }
  return true;
}
