import { useState, useMemo, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import MapView from '../../components/MapView';
import RequestForm from '../../components/RequestForm';
import ProvidersList from '../../components/ProvidersList';
import { useRoute } from '../../hooks/useRoute';
import { MOCK_PROVIDERS } from '../../types/constants';
import type { Provider } from '../../types/types';
import { getNearbyProviders } from '../../utils/distance';
import { useLocation } from '../../hooks/useLocation';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

const InstantRequestPage = () => {
  const [searchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    position: customerPos,
    setPosition: setCustomerPos,
    address,
    locating,
    detect,
    searchAddress,
  } = useLocation();

  const initialQuery = searchParams.get('q') || '';
  const initialLocation = searchParams.get('loc') || '';
  const initialCategory = searchParams.get('cat') || 'الكل';

  useEffect(() => {
    if (initialLocation) {
      searchAddress(initialLocation);
    } else {
      detect();
    }
  }, [initialLocation]);

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );

  const nearbyProviders = useMemo(() => {
    let filtered = MOCK_PROVIDERS;
    if (initialCategory && initialCategory !== 'الكل') {
      filtered = filtered.filter((p) => p.profession.includes(initialCategory));
    }
    return getNearbyProviders(filtered, customerPos, 10);
  }, [customerPos, initialCategory]);

  const { route } = useRoute(
    selectedProvider?.position ?? null,
    selectedProvider ? customerPos : null,
  );

  function handleProviderSelect(provider: Provider) {
    setSelectedProvider((prev) => (prev?.id === provider.id ? null : provider));
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }

  // Close sidebar when provider is selected on mobile
  useEffect(() => {
    if (selectedProvider && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [selectedProvider]);

  return (
    <div className="bg-background flex h-[calc(100vh-64px)] flex-col overflow-hidden font-[Cairo,sans-serif] md:flex-row">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105 md:hidden"
      >
        {sidebarOpen ? (
          <X className="text-foreground h-5 w-5" />
        ) : (
          <Menu className="text-foreground h-5 w-5" />
        )}
      </button>

      {/* Sidebar - Mobile drawer on small screens */}
      <aside
        className={cn(
          'border-border bg-sidebar absolute inset-y-0 left-0 z-30 flex w-full flex-col overflow-y-auto border-l backdrop-blur-sm transition-transform duration-300 ease-out md:relative md:w-full md:max-w-md md:translate-x-0 md:transition-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Sidebar header on mobile */}
        <div className="border-border flex items-center justify-between border-b px-4 py-3 md:hidden">
          <h2 className="text-foreground text-sm font-bold">عروض متاحة</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form and list */}
        <RequestForm
          key={`${initialCategory}-${initialQuery}-${initialLocation}`}
          initialService={initialQuery}
          initialCategory={initialCategory}
          address={address}
          locating={locating}
          onDetect={detect}
          onAddressSearch={searchAddress}
          onSend={(data) => console.log('request sent:', data)}
        />
        <ProvidersList
          providers={nearbyProviders}
          selectedId={selectedProvider?.id ?? null}
          onSelect={handleProviderSelect}
        />
      </aside>

      {/* Overlay on mobile when sidebar is open */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 z-20 bg-black/50 md:hidden"
        />
      )}

      {/* Map */}
      <MapView
        center={customerPos}
        customerPos={customerPos}
        providers={nearbyProviders}
        selectedProvider={selectedProvider}
        route={route}
        onLocationSelect={setCustomerPos}
        onProviderSelect={handleProviderSelect}
        onAddressSearch={searchAddress}
      />
    </div>
  );
};

export default InstantRequestPage;
