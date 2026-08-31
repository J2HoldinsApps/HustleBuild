import { Platform } from 'react-native';
import { getRevenueCatKey } from '@/config';
import { initRevenueCat, checkPremiumStatus, purchasePremium, restorePurchases } from 'react-native-purchases';

export { checkPremiumStatus, purchasePremium, restorePurchases };

export const initRevenueCatNative = async (): Promise<void> => {
  if (Platform.OS === 'web') return;
  try {
    await initRevenueCat({ apiKey: getRevenueCatKey() });
  } catch (e) {
    // Ignore on platforms without RevenueCat
  }
};

export { initRevenueCatNative as initRevenueCat };
