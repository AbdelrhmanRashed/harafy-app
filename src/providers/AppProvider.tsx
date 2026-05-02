import { QueryProvider } from './QueryProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from './ThemeProvider';
import { NotificationSocketProvider } from '@/realtime/useNotificationSocket';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <NotificationSocketProvider>
          <TooltipProvider>
            <Toaster position="top-right" richColors />
            {children}
          </TooltipProvider>
        </NotificationSocketProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};
