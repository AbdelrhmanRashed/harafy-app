import { useTheme } from '@/hooks/useTheme';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useTheme();
  return <NextThemeProvider>{children}</NextThemeProvider>;
};

export default ThemeProvider;
