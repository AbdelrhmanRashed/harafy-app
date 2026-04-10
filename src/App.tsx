import AppRoutes from './core/router';
import MyRequestsView from './features/services/pages/requests/MyRequestsView';
import { AppProvider } from './providers/AppProvider';
const App = () => {
  return (
    // <AppProvider>
    //   <AppRoutes />
    // </AppProvider>
    <MyRequestsView />
  );
};

export default App;
