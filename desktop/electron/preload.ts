/**
 * Electron Preload Script
 * Secure bridge between main process and renderer process
 */
import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),

  // Persistent storage
  store: {
    get: (key: string) => ipcRenderer.invoke('store-get', key),
    set: (key: string, value: any) => ipcRenderer.invoke('store-set', key, value),
    delete: (key: string) => ipcRenderer.invoke('store-delete', key),
  },

  // Exam management
  exam: {
    getHistory: () => ipcRenderer.invoke('get-exam-history'),
    saveResult: (result: any) => ipcRenderer.invoke('save-exam-result', result),
    exportResults: (data: any) => ipcRenderer.invoke('export-exam-results', data),
  },

  // Event listeners
  on: {
    newExam: (callback: () => void) => {
      ipcRenderer.on('new-exam', callback);
      return () => ipcRenderer.removeListener('new-exam', callback);
    },
    updateAvailable: (callback: () => void) => {
      ipcRenderer.on('update-available', callback);
      return () => ipcRenderer.removeListener('update-available', callback);
    },
    updateDownloaded: (callback: () => void) => {
      ipcRenderer.on('update-downloaded', callback);
      return () => ipcRenderer.removeListener('update-downloaded', callback);
    },
  },

  // Platform info
  platform: process.platform,
});

// Type definitions for TypeScript
export interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  store: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
    delete: (key: string) => Promise<void>;
  };
  exam: {
    getHistory: () => Promise<any[]>;
    saveResult: (result: any) => Promise<boolean>;
    exportResults: (data: any) => Promise<{ success: boolean; path?: string }>;
  };
  on: {
    newExam: (callback: () => void) => () => void;
    updateAvailable: (callback: () => void) => () => void;
    updateDownloaded: (callback: () => void) => () => void;
  };
  platform: string;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
