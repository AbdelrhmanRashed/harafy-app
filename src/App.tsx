import AppRoutes from './core/router';
import { TooltipProvider } from '@/components/ui/tooltip';
import ProfilePage from './features/profile/pages/ProfilePage';
import SettingsPage from './features/profile/pages/SettingsPage';
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <TooltipProvider>
      <AppRoutes />
    </TooltipProvider>
    // <BrowserRouter>
    // <SettingsPage   />
    // </BrowserRouter>
  );
};

export default App;
