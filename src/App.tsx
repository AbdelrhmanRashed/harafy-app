import AppRoutes from './core/router';
import { AppProvider } from './providers/AppProvider';

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
