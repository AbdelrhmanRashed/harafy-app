import AppRoutes from './core/router';
import { TooltipProvider } from '@/components/ui/tooltip';
import ThemeProvider from './providers/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <AppRoutes />
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
