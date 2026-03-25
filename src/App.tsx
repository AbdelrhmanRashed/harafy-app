import AppRoutes from './routes/routes';
import { TooltipProvider } from '@/components/ui/tooltip';

const App = () => {
  return (
    <TooltipProvider>
      <AppRoutes />
    </TooltipProvider>
  );
};

export default App;
