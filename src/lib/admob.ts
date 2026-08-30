import { Platform } from 'react-native';

let admob: any;

if (Platform.OS === 'web') {
  admob = require('./admob.web');
} else {
  admob = require('./admob.native');
}

export const loadInterstitial = admob.loadInterstitial;
export const showInterstitial = admob.showInterstitial;
export const loadRewarded = admob.loadRewarded;
export const showRewarded = admob.showRewarded;
