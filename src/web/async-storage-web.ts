export default {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // no-op
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // no-op
    }
  },
};
