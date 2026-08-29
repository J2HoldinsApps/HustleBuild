import { Platform } from 'react-native';

// RevenueCat public API keys — replace with your own from app.revenuecat.com
export const REVENUECAT_IOS_KEY = 'appl_YOUR_IOS_KEY';
export const REVENUECAT_ANDROID_KEY = 'goog_YOUR_ANDROID_KEY';

export const getRevenueCatKey = () => {
  if (Platform.OS === 'ios') return REVENUECAT_IOS_KEY;
  return REVENUECAT_ANDROID_KEY;
};

// Google AdMob test ad unit IDs (Google's official test IDs)
export const ADMOB_BANNER_ID = Platform.OS === 'ios'
  ? 'ca-app-pub-3940256099942544/2934735716'
  : 'ca-app-pub-3940256099942544/6300978111';

export const ADMOB_INTERSTITIAL_ID = Platform.OS === 'ios'
  ? 'ca-app-pub-3940256099942544/4411468910'
  : 'ca-app-pub-3940256099942544/1033173712';

export const ADMOB_REWARDED_ID = Platform.OS === 'ios'
  ? 'ca-app-pub-3940256099942544/1715395716'
  : 'ca-app-pub-3940256099942544/5224354937';
