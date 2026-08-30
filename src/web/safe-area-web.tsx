import React from 'react';
import { View } from 'react-native';

export const SafeAreaView = ({ children, style }: any) => {
  return <View style={[{ flex: 1 }, style]}>{children}</View>;
};

export const SafeAreaProvider = ({ children }: any) => {
  return <>{children}</>;
};

export const SafeAreaConsumer = ({ children }: any) => {
  return <>{children({ top: 0, bottom: 0, left: 0, right: 0 })}</>;
};

export const SafeAreaInsetsContext = React.createContext({ top: 0, bottom: 0, left: 0, right: 0 });

export const initialWindowMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, bottom: 0, left: 0, right: 0 },
};

export const useSafeAreaInsets = () => ({ top: 0, bottom: 0, left: 0, right: 0 });

export const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 0, height: 0 });
