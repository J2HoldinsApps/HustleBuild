import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function BannerAd() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Advertisement</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  text: {
    color: '#64748B',
    fontSize: 10,
  },
});
