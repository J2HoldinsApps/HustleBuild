import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { showRewarded } from '@/lib/admob';
import { usePremium } from '@/context/PremiumContext';

const STATUS_MESSAGES = [
  'Locating local structural voids...',
  'Scanning Craigslist & Nextdoor...',
  'Analyzing seasonal demand spikes...',
  'Matching assets to high-margin gigs...',
  'Finalizing your Blueprint...',
];

export function SynthesisScreen({ navigation }: any) {
  const { isPremium } = usePremium();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress] = useState(new Animated.Value(0));
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Spinner rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Progress bar
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    // Cycle through status messages
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < STATUS_MESSAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000);

    // After all messages + rewarded ad, navigate to Hustles
    const timeout = setTimeout(async () => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;

      if (!isPremium) {
        await showRewarded();
      }
      navigation.replace('Hustles');
    }, 11000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]}>
          <View style={styles.spinnerOuter}>
            <View style={styles.spinnerInner} />
          </View>
        </Animated.View>

        <Text style={styles.title}>SYNTHESIS</Text>

        <Animated.View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </Animated.View>

        <Animated.Text
          key={messageIndex}
          style={styles.statusText}
        >
          {STATUS_MESSAGES[messageIndex]}
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    width: '80%',
  },
  spinner: {
    width: 80,
    height: 80,
    marginBottom: 40,
  },
  spinnerOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#334155',
    borderTopColor: '#2DD4BF',
    borderRightColor: '#2DD4BF',
  },
  spinnerInner: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#1E293B',
  },
  title: {
    color: '#2DD4BF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 24,
  },
  progressContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2DD4BF',
    borderRadius: 3,
  },
  statusText: {
    color: '#F1F5F9',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
