import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import { usePremium } from '@/context/PremiumContext';
import { BannerAd } from '@/components/BannerAd';
import { ASSET_CATEGORIES, type Asset } from '@/data/assets';

export function VaultScreen() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', category: 'Vehicle', value: '' });
  const { isPremium } = usePremium();

  const loadAssets = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAssets(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  const addAsset = async () => {
    if (!newAsset.name || !newAsset.value) {
      Alert.alert('Missing fields', 'Please enter a name and value.');
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('assets')
      .insert({
        user_id: session.user.id,
        name: newAsset.name,
        category: newAsset.category,
        value: parseFloat(newAsset.value),
        status: 'idle',
        image: '📦',
        description: '',
      })
      .select()
      .single();

    if (!error && data) {
      setAssets([data, ...assets]);
      setNewAsset({ name: '', category: 'Vehicle', value: '' });
      setShowAddModal(false);
    }
  };

  const deleteAsset = async (id: string) => {
    const { error } = await supabase.from('assets').delete().eq('id', id);
    if (!error) {
      setAssets(assets.filter(a => a.id !== id));
    }
  };

  const totalValue = assets.reduce((sum, a) => sum + (a.value || 0), 0);
  const activeCount = assets.filter(a => a.status === 'active').length;

  const renderAsset = ({ item }: { item: Asset }) => (
    <View style={styles.assetCard}>
      <View style={styles.assetIcon}>
        <Text style={styles.assetEmoji}>{item.image || '📦'}</Text>
      </View>
      <View style={styles.assetInfo}>
        <Text style={styles.assetName}>{item.name}</Text>
        <Text style={styles.assetCategory}>{item.category}</Text>
        <Text style={styles.assetValue}>${item.value.toLocaleString()}</Text>
      </View>
      <View style={styles.assetActions}>
        <View style={[styles.statusBadge, item.status === 'active' ? styles.statusActive : styles.statusIdle]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteAsset(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isPremium && <BannerAd />}
      <View style={styles.header}>
        <Text style={styles.title}>Asset Vault</Text>
        <Text style={styles.subtitle}>{assets.length} assets · ${totalValue.toLocaleString()} total</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{assets.length}</Text>
          <Text style={styles.statLabel}>Total Assets</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeCount}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{assets.length - activeCount}</Text>
          <Text style={styles.statLabel}>Idle</Text>
        </View>
      </View>

      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : assets.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>No assets yet</Text>
          <Text style={styles.emptySubtext}>Add your first asset to start hustling</Text>
        </View>
      ) : (
        <FlatList
          data={assets}
          renderItem={renderAsset}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setShowAddModal(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Asset</Text>
            <TextInput
              style={styles.input}
              placeholder="Asset name"
              placeholderTextColor="#64748B"
              value={newAsset.name}
              onChangeText={text => setNewAsset({ ...newAsset, name: text })}
            />
            <View style={styles.categoryRow}>
              {ASSET_CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    newAsset.category === cat && styles.categoryChipActive,
                  ]}
                  onPress={() => setNewAsset({ ...newAsset, category: cat })}
                >
                  <Text style={[styles.categoryText, newAsset.category === cat && styles.categoryTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Estimated value ($)"
              placeholderTextColor="#64748B"
              value={newAsset.value}
              onChangeText={text => setNewAsset({ ...newAsset, value: text })}
              keyboardType="numeric"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={addAsset}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  header: { padding: 20, paddingBottom: 12 },
  title: { color: '#F1F5F9', fontSize: 28, fontWeight: '900' },
  subtitle: { color: '#64748B', fontSize: 14, marginTop: 4 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#1E293B', borderRadius: 12, padding: 16, marginRight: 8, alignItems: 'center' },
  statValue: { color: '#2DD4BF', fontSize: 24, fontWeight: '800' },
  statLabel: { color: '#64748B', fontSize: 11, marginTop: 4 },
  list: { padding: 20, paddingTop: 0 },
  assetCard: { flexDirection: 'row', backgroundColor: '#1E293B', borderRadius: 16, padding: 16, marginBottom: 12, alignItems: 'center' },
  assetIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  assetEmoji: { fontSize: 24 },
  assetInfo: { flex: 1 },
  assetName: { color: '#F1F5F9', fontSize: 16, fontWeight: '700' },
  assetCategory: { color: '#64748B', fontSize: 12, marginTop: 2 },
  assetValue: { color: '#2DD4BF', fontSize: 14, fontWeight: '600', marginTop: 4 },
  assetActions: { alignItems: 'flex-end' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginBottom: 8 },
  statusActive: { backgroundColor: '#064E3B' },
  statusIdle: { backgroundColor: '#334155' },
  statusText: { color: '#94A3B8', fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
  deleteText: { color: '#EF4444', fontSize: 12 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#64748B', fontSize: 18, fontWeight: '600' },
  emptySubtext: { color: '#475569', fontSize: 14, marginTop: 4 },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#2DD4BF', alignItems: 'center', justifyContent: 'center', shadowColor: '#2DD4BF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  fabText: { color: '#0F172A', fontSize: 28, fontWeight: '300' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalContent: { backgroundColor: '#1E293B', borderRadius: 20, padding: 24 },
  modalTitle: { color: '#F1F5F9', fontSize: 22, fontWeight: '700', marginBottom: 20 },
  input: { backgroundColor: '#0F172A', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: '#F1F5F9', fontSize: 16, borderWidth: 1, borderColor: '#334155', marginBottom: 12 },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  categoryChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#0F172A', marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: '#334155' },
  categoryChipActive: { backgroundColor: '#2DD4BF', borderColor: '#2DD4BF' },
  categoryText: { color: '#94A3B8', fontSize: 12, fontWeight: '600' },
  categoryTextActive: { color: '#0F172A' },
  modalActions: { flexDirection: 'row', marginTop: 8 },
  cancelButton: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginRight: 8, backgroundColor: '#334155' },
  cancelText: { color: '#94A3B8', fontSize: 16, fontWeight: '600' },
  addButton: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center', backgroundColor: '#2DD4BF' },
  addButtonText: { color: '#0F172A', fontSize: 16, fontWeight: '800' },
});
