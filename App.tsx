import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { PremiumProvider, usePremium } from '@/context/PremiumContext';
import { VaultScreen } from '@/screens/VaultScreen';
import { HustlesScreen } from '@/screens/HustlesScreen';
import { PremiumScreen } from '@/screens/PremiumScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { AuthScreen } from '@/screens/AuthScreen';
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

function AppContent() {
  const [session, setSession] = useState<any>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setLoading(false);
      }
    }, 3000);

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (cancelled) return;
        setSession(session);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
      });

    let subscription: any;
    try {
      const result = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session) setDemoMode(false);
      });
      subscription = result.data.subscription;
    } catch {
      // auth listener failed, ignore
    }

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      subscription?.unsubscribe();
    };
  }, []);

  const handleDemoMode = () => {
    setDemoMode(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!session && !demoMode) {
    return <AuthScreen onDemoMode={handleDemoMode} navigation={{ replace: () => {} }} />;
  }

  return (
    <DemoProvider demoMode={demoMode}>
      <MainTabs />
    </DemoProvider>
  );
}

export function App() {
  return (
    <PremiumProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <NavigationContainer>
          <AppContent />
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#64748B',
    fontSize: 16,
  },
});
