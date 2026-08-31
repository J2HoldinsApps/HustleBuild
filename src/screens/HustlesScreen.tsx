import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import { usePremium } from '@/context/PremiumContext';
import { BannerAd } from '@/components/BannerAd';
import { HUSTLE_IDEAS } from '@/data/assets';

export function HustlesScreen() {
  const [assets, setAssets] = useState<any[]>([]);
  const { isPremium } = usePremium();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase
        .from('assets')
        .select('*')
        .eq('user_id', session.user.id);
      if (data) setAssets(data);
    })();
  }, []);

  const matchedIdeas = assets.flatMap(asset =>
    HUSTLE_IDEAS
      .filter(idea => idea.asset === asset.category || idea.asset === 'Other')
      .map(idea => ({ ...idea, assetName: asset.name, assetId: asset.id }))
  );

  const renderIdea = ({ item }: { item: any }) => (
    <View style={styles.ideaCard}>
      <View style={styles.ideaHeader}>
        <Text style={styles.ideaAsset}>{item.assetName}</Text>
        <Text style={styles.ideaPotential}>{item.potential}</Text>
      </View>
      <Text style={styles.ideaText}>{item.idea}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isPremium && <BannerAd />}
      <View style={styles.header}>
        <Text style={styles.title}>Hustles</Text>
        <Text style={styles.subtitle}>
          {matchedIdeas.length} ideas based on your assets
        </Text>
      </View>

      {matchedIdeas.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>💡</Text>
          <Text style={styles.emptyText}>No hustle ideas yet</Text>
          <Text style={styles.emptySubtext}>Add assets to your vault to see ideas</Text>
        </View>
      ) : (
        <FlatList
          data={matchedIdeas}
          renderItem={renderIdea}
          keyExtractor={(item, index) => `${item.assetId}-${index}`}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { padding: 20, paddingBottom: 12 },
  title: { color: '#F1F5F9', fontSize: 28, fontWeight: '900' },
  subtitle: { color: '#64748B', fontSize: 14, marginTop: 4 },
  list: { padding: 20, paddingTop: 0 },
  ideaCard: { backgroundColor: '#1E293B', borderRadius: 16, padding: 16, marginBottom: 12 },
  ideaHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  ideaAsset: { color: '#2DD4BF', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  ideaPotential: { color: '#94A3B8', fontSize: 12, fontWeight: '600' },
  ideaText: { color: '#F1F5F9', fontSize: 15 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#64748B', fontSize: 18, fontWeight: '600' },
  emptySubtext: { color: '#475569', fontSize: 14, marginTop: 4 },
});
