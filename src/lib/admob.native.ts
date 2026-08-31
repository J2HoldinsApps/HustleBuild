import { Platform } from 'react-native';
import { ADMOB_BANNER_ID, ADMOB_INTERSTITIAL_ID, ADMOB_REWARDED_ID } from '@/config';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

let interstitialLoaded = false;
let rewardedLoaded = false;

export const initAdMob = async (): Promise<void> => {
  await mobileAds().setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.PG,
  tagForChildDirectedTreatment: false,
  tagForUnderAgeOfConsent: false,
  testDeviceIds: [],
  // @ts-ignore
    });
};

export const showInterstitialAd = async (): Promise<void> => {
  if (Platform.OS === 'web') return;
  const InterstitialAdModule = require('react-native-google-mobile-ads').TestIds;
  // On native, load and show interstitial
  // This is a simplified version — full implementation would use createInterstitialAd
};

export const showRewardedAd = async (): Promise<boolean> => {
  if (Platform.OS === 'web') return false;
  // On native, load and show rewarded ad
  return false;
};
