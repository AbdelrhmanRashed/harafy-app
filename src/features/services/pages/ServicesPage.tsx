import { useEffect, useMemo, useRef, useState } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Loader2, SearchX } from 'lucide-react';

import HeroSection from '../components/HeroSection';
import CategoryList from '../components/CatagoryList';
import { DirectRequestForm } from '../components/DirectRequestForm';

import { useLocation } from '../hooks/useLocation';
import { useGetNearbyProviders } from '../hooks/useNearbyProviders';
import { useServices } from '@/features/onboarding/hooks/useServices';
import type { Provider } from '../types/types';
import ProvidersSearchList from '../components/ProvidersSearchList';
import { useNavigate } from 'react-router-dom';
import { normalizeProviders } from '../utils/providerUtils';

type ServiceCategory = {
  id: number;
  name: string;
};

const normalizeSearchText = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, '');

const findMatchingCategory = (
  query: string,
  categories: ServiceCategory[],
): ServiceCategory | undefined => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) return undefined;

  return categories.find((category) => {
    const normalizedName = normalizeSearchText(category.name);
    return (
      normalizedName.includes(normalizedQuery) ||
      normalizedQuery.includes(normalizedName)
    );
  });
};

export default function ServicesPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState('');
  const [activeLocationLabel, setActiveLocationLabel] = useState('');
  const navigate = useNavigate();
  const locationRequestedRef = useRef(false);

  // جلب الموقع الحالي (تأكد إن الـ Hook ده شغال وبيرجع قيم)
  const { position, address, locating, detect, searchAddress } = useLocation();

  useEffect(() => {
    if (locationRequestedRef.current) return;
    locationRequestedRef.current = true;
    void detect();
  }, [detect]);

  // 1. جلب الأقسام (الـ categories اللي أنت بعت الـ response بتاعها)
  const { data: categoriesData } = useServices();

  const categories = useMemo(() => {
    // الـ response اللي أنت بعته عبارة عن Array مباشر
    return Array.isArray(categoriesData) ? (categoriesData as ServiceCategory[]) : [];
  }, [categoriesData]);

  // 2. جلب الفنيين بناءً على القسم المختار والموقع
  // الـ Hook ده مش هيشتغل (Enabled) إلا لو selectedServiceId أكبر من 0
  const { data: nearbyData, isLoading: isProvidersLoading } = useGetNearbyProviders(
    String(position.lat),
    String(position.lng),
    selectedServiceId,
  );

  const handleOpenRequest = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsDrawerOpen(true);
  };

  // أهم خطوة: استخراج البيانات من الـ Response بتاع الفنيين
  const providers = useMemo(() => {
    if (!nearbyData) return [];
    const rawData = Array.isArray(nearbyData)
      ? nearbyData
      : (
          (nearbyData as {
            data?: unknown[];
            items?: unknown[];
            providers?: unknown[];
            results?: unknown[];
          }).data ??
          (nearbyData as {
            data?: unknown[];
            items?: unknown[];
            providers?: unknown[];
            results?: unknown[];
          }).items ??
          (nearbyData as {
            data?: unknown[];
            items?: unknown[];
            providers?: unknown[];
            results?: unknown[];
          }).providers ??
          (nearbyData as {
            data?: unknown[];
            items?: unknown[];
            providers?: unknown[];
            results?: unknown[];
          }).results ??
          []
        );

    return normalizeProviders(
      rawData as Parameters<typeof normalizeProviders>[0],
    ).map((provider) =>
      provider.services.length > 0
        ? provider
        : {
            ...provider,
            services: [
              {
                id: selectedServiceId,
                name: selectedCategoryName || 'خدمة غير محددة',
              },
            ],
          },
    );
  }, [nearbyData, selectedServiceId, selectedCategoryName]);

  const runSearch = async (
    serviceId: number,
    serviceName: string,
    locationQuery = '',
  ) => {
    const trimmedLocation = locationQuery.trim();
    let nextLocationLabel = address;
    let feedback = '';

    if (trimmedLocation) {
      const resolvedLocation = await searchAddress(trimmedLocation);
      if (resolvedLocation) {
        nextLocationLabel = resolvedLocation.address;
      } else {
        feedback = `تعذر تحديد "${trimmedLocation}" بدقة، فتم استخدام آخر موقع متاح.`;
      }
    } else if (!nextLocationLabel || nextLocationLabel.startsWith('جاري')) {
      const detectedLocation = await detect();
      if (detectedLocation) {
        nextLocationLabel = detectedLocation.address;
      }
    }

    setSearchFeedback(feedback);
    setSelectedServiceId(serviceId);
    setSelectedCategoryName(serviceName);
    setActiveLocationLabel(nextLocationLabel || 'موقعك الحالي');
    setHasSearched(true); // دي اللي بتفتح قسم النتائج
  };

  const handleCategorySelect = (id: number, name: string) => {
    void runSearch(id, name);
  };

  const handleHeroSearch = async (query: string, location: string) => {
    if (!categories.length) {
      setSearchFeedback('جاري تحميل التخصصات حالياً، حاولي مرة ثانية بعد لحظة.');
      return;
    }

    const matchedCategory = findMatchingCategory(query, categories);

    if (!matchedCategory) {
      setHasSearched(false);
      setSearchFeedback(`لم نجد تخصصاً مطابقاً لـ "${query}". اختاري من الأقسام المتاحة بالأسفل.`);
      return;
    }

    await runSearch(matchedCategory.id, matchedCategory.name, location);
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      <HeroSection onSearch={handleHeroSearch} isSearching={locating} />

      <div className="container mx-auto mt-[-3rem] relative z-30 px-4">
        <CategoryList
          categories={categories}
          selectedId={selectedServiceId}
          onSelect={handleCategorySelect}
        />

        {searchFeedback && (
          <div className="mt-5 rounded-3xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm font-bold text-amber-700">
            {searchFeedback}
          </div>
        )}
      </div>

      {/* قسم عرض الفنيين: لا يظهر إلا بعد اختيار قسم */}
      {hasSearched && (
        <section className="container mx-auto mt-12 px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-black">
              {selectedCategoryName ? `متخصصون في ${selectedCategoryName}` : 'النتائج المتاحة'}
            </h2>
            {activeLocationLabel && (
              <p className="text-muted-foreground mt-2 text-sm font-bold">
                الموقع المستخدم في البحث: {activeLocationLabel}
              </p>
            )}
          </div>

          {isProvidersLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground font-bold">جاري البحث عن فنيين...</p>
            </div>
          ) : providers.length > 0 ? (
            <ProvidersSearchList
              providers={providers}
              isLoading={isProvidersLoading}
              onServiceRequest={handleOpenRequest}
              onViewProfile={(p) => navigate(`/profile/${p.id}`)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-20 text-center">
              <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold">لا يوجد فنيين حالياً</h3>
              <p className="text-muted-foreground mt-2">جرب اختيار قسم آخر أو تغيير المنطقة</p>
            </div>
          )}
        </section>
      )}

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
        <DrawerContent
          className="fixed inset-y-0 right-0 z-50 mt-0 h-full max-w-none! border-l bg-background outline-none w-full md:w-[400px]! rounded-none"
        >
          <div className="flex h-full flex-col overflow-hidden">            
            {selectedProvider && (
              <DirectRequestForm
                provider={selectedProvider}
                onClose={() => setIsDrawerOpen(false)}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
