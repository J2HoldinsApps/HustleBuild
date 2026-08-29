/// <reference types="expo/types" />

// NOTE: This file provides type declarations for @env imports.
// In a real Expo project, you'd use react-native-dotenv or expo's built-in env support.
// For the preview environment, we provide fallback values.

declare module '@env' {
  export const SUPABASE_URL: string;
  export const SUPABASE_ANON_KEY: string;
}
