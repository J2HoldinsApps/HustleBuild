import { Platform } from 'react-native';

let rc: any;

if (Platform.OS === 'web') {
  rc = require('./revenuecat.web');
} else {
  rc = require('./revenuecat.native');
}

export const initRevenueCat = rc.initRevenueCat;
export const getOfferings = rc.getOfferings;
export const purchasePackage = rc.purchasePackage;
export const restorePurchases = rc.restorePurchases;
export const checkPremiumStatus = rc.checkPremiumStatus;
