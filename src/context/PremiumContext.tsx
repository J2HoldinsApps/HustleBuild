import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { checkPremiumStatus, initRevenueCat } from '@/lib/revenuecat';

type PremiumContextType = {
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  loading: boolean;
};

const PremiumContext = createContext<PremiumContextType>({
  isPremium: false,
  setIsPremium: () => {},
  loading: true,
});

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await initRevenueCat();
      const status = await checkPremiumStatus();
      setIsPremium(status);
      setLoading(false);
    })();
  }, []);

  return (
    <PremiumContext.Provider value={{ isPremium, setIsPremium, loading }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  return useContext(PremiumContext);
}
