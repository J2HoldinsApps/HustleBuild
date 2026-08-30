import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-safe-area-context': path.resolve(__dirname, './src/web/safe-area-web.tsx'),
      'react-native-screens': path.resolve(__dirname, './src/web/safe-area-web.tsx'),
      'react-native-google-mobile-ads': path.resolve(__dirname, './src/web/empty.ts'),
      'react-native-purchases': path.resolve(__dirname, './src/web/empty.ts'),
      '@react-native-async-storage/async-storage': path.resolve(__dirname, './src/web/async-storage-web.ts'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.EXPO_PUBLIC_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || ''),
    'process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || ''),
    'process.env.EXPO_PUBLIC_REVENUECAT_API_KEY': JSON.stringify(''),
  },
  optimizeDeps: {
    exclude: [
      'react-native-google-mobile-ads',
      'react-native-purchases',
      'react-native-screens',
    ],
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: {
    port: 8081,
    host: true,
  },
});
