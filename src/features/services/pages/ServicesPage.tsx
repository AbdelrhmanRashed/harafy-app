import { useState, useMemo } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import HeroSection from '../components/HeroSection';
import CategoryList from '../components/CatagoryList';
import ServiceSearchCard from '../components/ServiceSearchCard';
import { MOCK_PROVIDERS } from '@/features/services/types/constants';
import { useNavigate } from 'react-router-dom';
import { DirectRequestForm } from '../components/DirectRequestForm';
import type { Provider } from '../types/types';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  function handleSearch(query: string, location: string) {
    const searchParams = new URLSearchParams({
      q: query,
      loc: location,
      cat: selectedCategory,
    }).toString();
    navigate(`/app/services/instant?${searchParams}`);
  }

  const handleOpenRequest = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsDrawerOpen(true);
  };

  const filteredProviders = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'الكل') return MOCK_PROVIDERS;
    return MOCK_PROVIDERS.filter((p) =>
      p.profession.includes(selectedCategory),
    );
  }, [selectedCategory]);

  return (
    <div className="bg-background min-h-screen bg-[linear-gradient(to_bottom,var(--secondary)_0%,var(--background)_400px)] transition-colors duration-300">
      <main className="mx-auto max-w-7xl">
        <section className="px-4 pt-6 md:pt-10">
          <HeroSection onSearch={handleSearch} />
        </section>

        <section className="mt-8 px-4 pb-20">
          {/* categories list */}
          <div className="mb-10">
            <CategoryList
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            {/* header of the section */}
            <div className="mb-8 flex flex-col gap-2 px-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                {selectedCategory && selectedCategory !== 'الكل'
                  ? `فنيين ${selectedCategory}`
                  : 'أبرز الحرفيين'}
              </h2>
              <p className="text-muted-foreground text-sm">
                متاح حالياً: {filteredProviders.length} فني
              </p>
            </div>

            {/* grid of providers */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.map((provider) => (
                <div key={provider.id} className="h-full">
                  <ServiceSearchCard
                    provider={provider}
                    onServiceRequest={handleOpenRequest}
                    onViewProfile={(p) =>
                      console.log('view profile of ', p.name)
                    }
                  />
                </div>
              ))}
            </div>

            {/* No results */}
            {filteredProviders.length === 0 && (
              <div className="border-border bg-card/50 flex flex-col items-center justify-center rounded-3xl border border-dashed py-24 text-center shadow-sm">
                <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl">
                  🔍
                </div>
                <h3 className="text-lg font-semibold">لا توجد نتائج</h3>
                <p className="text-muted-foreground mt-2 max-w-xs">
                  عذراً، لا يوجد فنيين في هذا القسم حالياً. جرب اختيار قسم آخر.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Drawer*/}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction={window.innerWidth > 768 ? 'right' : 'bottom'}
      >
        <DrawerContent className="mx-auto h-[90vh] md:h-screen md:w-[450px] md:max-w-md">
          <div className="custom-scrollbar h-full overflow-y-auto p-4">
            {selectedProvider && (
              <DirectRequestForm
                provider={selectedProvider}
                onClose={() => setIsDrawerOpen(false)}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
