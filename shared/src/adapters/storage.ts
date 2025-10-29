/**
 * Platform-agnostic storage abstraction layer
 * Prevents conflicts between localStorage, Electron store, and AsyncStorage
 */

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

/**
 * Web (Frontend) - localStorage adapter
 */
export class WebStorageAdapter implements StorageAdapter {
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('localStorage getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('localStorage setItem error:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage removeItem error:', error);
    }
  }
}

/**
 * Electron (Desktop) - Electron store adapter
 */
export class ElectronStorageAdapter implements StorageAdapter {
  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof window !== 'undefined' && (window as any).electronAPI) {
        const value = await (window as any).electronAPI.store.get(key);
        return value !== undefined ? value : null;
      }
      return null;
    } catch (error) {
      console.error('Electron store getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && (window as any).electronAPI) {
        await (window as any).electronAPI.store.set(key, value);
      }
    } catch (error) {
      console.error('Electron store setItem error:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && (window as any).electronAPI) {
        await (window as any).electronAPI.store.delete(key);
      }
    } catch (error) {
      console.error('Electron store removeItem error:', error);
    }
  }
}

/**
 * React Native (Mobile) - AsyncStorage adapter
 * Note: Requires AsyncStorage to be passed in to avoid direct dependency
 */
export class MobileStorageAdapter implements StorageAdapter {
  private asyncStorage: any;

  constructor(asyncStorage: any) {
    this.asyncStorage = asyncStorage;
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await this.asyncStorage.getItem(key);
    } catch (error) {
      console.error('AsyncStorage getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await this.asyncStorage.setItem(key, value);
    } catch (error) {
      console.error('AsyncStorage setItem error:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.asyncStorage.removeItem(key);
    } catch (error) {
      console.error('AsyncStorage removeItem error:', error);
    }
  }
}

/**
 * Memory-only adapter (for testing or SSR)
 */
export class MemoryStorageAdapter implements StorageAdapter {
  private storage: Map<string, string> = new Map();

  async getItem(key: string): Promise<string | null> {
    return this.storage.get(key) || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.storage.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
  }
}

/**
 * Auto-detect platform and return appropriate storage adapter
 */
export function createStorageAdapter(): StorageAdapter {
  // Electron environment
  if (typeof window !== 'undefined' && (window as any).electronAPI) {
    return new ElectronStorageAdapter();
  }

  // Web environment
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    return new WebStorageAdapter();
  }

  // Fallback to memory storage
  return new MemoryStorageAdapter();
}
