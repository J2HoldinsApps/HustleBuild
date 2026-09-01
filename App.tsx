import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PremiumProvider, usePremium } from '@/context/PremiumContext';
import { VaultScreen } from '@/screens/VaultScreen';
import { HustlesScreen } from '@/screens/HustlesScreen';
import { PremiumScreen } from '@/screens/PremiumScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { DemoProvider } from '@/context/DemoContext';

function StatusBar(_props: { style?: string }) {
  return null;
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  const { isPremium } = usePremium();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1E293B',
          borderTopColor: '#334155',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2DD4BF',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Vault"
        component={VaultScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="🛻" color={color} />,
        }}
      />
      <Tab.Screen
        name="Hustles"
        component={HustlesScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="💼" color={color} />,
        }}
      />
      <Tab.Screen
        name="Premium"
        component={PremiumScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="👑" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <Text style={{ fontSize: 20, opacity: color === '#64748B' ? 0.6 : 1 }}>{icon}</Text>;
}

export function App() {
  return (
    <PremiumProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <NavigationContainer>
          <DemoProvider demoMode={true}>
            <MainTabs />
          </DemoProvider>
        </NavigationContainer>
      </SafeAreaView>
    </PremiumProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});
