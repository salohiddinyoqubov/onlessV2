/**
 * Unified ThemeContext for all platforms
 * Works with: Frontend (Next.js), Mobile (React Native), Desktop (Electron)
 */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { StorageAdapter } from '../adapters/storage';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  storageAdapter: StorageAdapter;
  /**
   * Platform-specific theme applier
   * For web/desktop: updates document.documentElement.classList
   * For mobile: can update AsyncStorage or app-wide theme state
   */
  applyTheme?: (theme: Theme) => void;
  /**
   * Get system theme preference
   * For web/desktop: uses window.matchMedia
   * For mobile: uses Appearance.getColorScheme()
   */
  getSystemTheme?: () => Theme;
}

export function ThemeProvider({
  children,
  storageAdapter,
  applyTheme,
  getSystemTheme,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await storageAdapter.getItem('theme');

      if (savedTheme === 'dark' || savedTheme === 'light') {
        setThemeState(savedTheme);
      } else if (getSystemTheme) {
        // Use system preference if available
        setThemeState(getSystemTheme());
      }

      setMounted(true);
    };

    loadTheme();
  }, [storageAdapter, getSystemTheme]);

  // Apply theme changes and save to storage
  useEffect(() => {
    if (!mounted) return;

    // Apply platform-specific theme
    if (applyTheme) {
      applyTheme(theme);
    }

    // Save to storage
    storageAdapter.setItem('theme', theme);
  }, [theme, mounted, applyTheme, storageAdapter]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Prevent flash of wrong theme during hydration
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
