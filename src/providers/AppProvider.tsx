import { QueryProvider } from './QueryProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from './ThemeProvider';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster position="top-right" richColors />
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};
