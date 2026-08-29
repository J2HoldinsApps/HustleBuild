// Web/preview implementation of AdMob
// Simulates ad events with mock behavior for the web preview

export async function loadInterstitial(): Promise<void> {
  // no-op on web
}

export async function showInterstitial(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1500));
}

export async function loadRewarded(): Promise<void> {
  // no-op on web
}

export async function showRewarded(): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return true;
}
