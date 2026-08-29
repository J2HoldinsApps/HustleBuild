// Native implementation of RevenueCat using react-native-purchases SDK
import { Platform } from 'react-native';
import { getRevenueCatKey } from '@/config';
import { SUBSCRIPTION_PACKAGES, SubscriptionPackage } from '@/data/assets';

let isInitialized = false;

export async function initRevenueCat(): Promise<void> {
  try {
    const Purchases = require('react-native-purchases').default;
    const apiKey = getRevenueCatKey();
    if (apiKey && !apiKey.includes('YOUR_')) {
      await Purchases.configure({ apiKey });
      isInitialized = true;
    }
  } catch {
    // SDK not available — fall back to simulated mode
    isInitialized = true;
  }
}

export async function getOfferings(): Promise<SubscriptionPackage[]> {
  if (!isInitialized) return SUBSCRIPTION_PACKAGES;

  try {
    const Purchases = require('react-native-purchases').default;
    const offerings = await Purchases.getOfferings();
    const packages: SubscriptionPackage[] = [];

    for (const pkg of SUBSCRIPTION_PACKAGES) {
      const rcPackage = offerings.current?.availablePackages?.find(
        (p: any) => p.identifier === pkg.identifier
      );
      if (rcPackage) {
        packages.push({ ...pkg, price: rcPackage.product.priceString });
      } else {
        packages.push(pkg);
      }
    }
    return packages;
  } catch {
    return SUBSCRIPTION_PACKAGES;
  }
}

export async function purchasePackage(identifier: string): Promise<boolean> {
  if (!isInitialized) return false;

  try {
    const Purchases = require('react-native-purchases').default;
    const offerings = await Purchases.getOfferings();
    const pkg = offerings.current?.availablePackages?.find(
      (p: any) => p.identifier === identifier
    );
    if (pkg) {
      await Purchases.purchasePackage(pkg);
      return true;
    }
    return false;
  } catch (e: any) {
    if (e?.userCancelled) return false;
    throw e;
  }
}

export async function restorePurchases(): Promise<boolean> {
  if (!isInitialized) return false;

  try {
    const Purchases = require('react-native-purchases').default;
    await Purchases.restorePurchases();
    const info = await Purchases.getCustomerInfo();
    return info.entitlements.active.size > 0;
  } catch {
    return false;
  }
}

export async function checkPremiumStatus(): Promise<boolean> {
  if (!isInitialized) return false;

  try {
    const Purchases = require('react-native-purchases').default;
    const info = await Purchases.getCustomerInfo();
    return info.entitlements.active.size > 0;
  } catch {
    return false;
  }
}
