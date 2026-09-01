import React, { createContext, useContext, useState } from 'react';
import { SAMPLE_ASSETS, type Asset } from '@/data/assets';

type DemoContextType = {
  demoMode: boolean;
  demoAssets: Asset[];
  addDemoAsset: (asset: Asset) => void;
  deleteDemoAsset: (id: string) => void;
};

const DemoContext = createContext<DemoContextType>({
  demoMode: false,
  demoAssets: [],
  addDemoAsset: () => {},
  deleteDemoAsset: () => {},
});

export function DemoProvider({ children, demoMode }: { children: React.ReactNode; demoMode: boolean }) {
  const [demoAssets, setDemoAssets] = useState<Asset[]>(demoMode ? SAMPLE_ASSETS : []);

  const addDemoAsset = (asset: Asset) => {
    setDemoAssets([asset, ...demoAssets]);
  };

  const deleteDemoAsset = (id: string) => {
    setDemoAssets(demoAssets.filter(a => a.id !== id));
  };

  return (
    <DemoContext.Provider value={{ demoMode, demoAssets, addDemoAsset, deleteDemoAsset }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  return useContext(DemoContext);
}
