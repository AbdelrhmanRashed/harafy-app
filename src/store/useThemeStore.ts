import { create } from 'zustand';

// Type for theme
type Theme = 'light' | 'dark';

// Interface for theme store
interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

// Get initial theme from localStorage
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  const saved = localStorage.getItem('theme') as Theme;

  if (saved) return saved;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return prefersDark ? 'dark' : 'light';
};

// Create theme store
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
