// Web/preview implementation of RevenueCat
// Simulates subscription state for the web preview

import { SUBSCRIPTION_PACKAGES, SubscriptionPackage } from '@/data/assets';

let simulatedPremium = false;

export async function initRevenueCat(): Promise<void> {
  // no-op on web
}

export async function getOfferings(): Promise<SubscriptionPackage[]> {
  return SUBSCRIPTION_PACKAGES;
}

export async function purchasePackage(identifier: string): Promise<boolean> {
  simulatedPremium = true;
  return true;
}

export async function restorePurchases(): Promise<boolean> {
  return simulatedPremium;
}

export async function checkPremiumStatus(): Promise<boolean> {
  return simulatedPremium;
}
