import AppRoutes from './core/router';
import { TooltipProvider } from '@/components/ui/tooltip';

const App = () => {
  return (
    <TooltipProvider>
      <AppRoutes />
    </TooltipProvider>
  );
};

export default App;
