import { useEffect, useMemo, useRef, useState } from 'react';
import { SearchX } from 'lucide-react';

import HeroSection from '../components/HeroSection';
import CategoryList from '../components/CatagoryList';

import { useLocationCustom } from '@/features/services/hooks/useLocation';
import { useGetNearbyProviders } from '../hooks/useNearbyProviders';
import { useServices } from '@/features/onboarding/hooks/useServices';
import type { Provider } from '../types/types';
import ProvidersSearchList from '../components/ProvidersSearchList';
import { useNavigate, useLocation } from 'react-router-dom';
import DirectServiceDrawer from '../components/DirectServiceDrawer';
import ReviewDialog from '../components/ReviewDialog';

import ServiceSearchCardSkeleton from '../components/ServiceSearchCardSkeleton';

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
  const [showReview, setShowReview] = useState(false);
  const [completedRequestId, setCompletedRequestId] = useState<number | null>(
    null,
  );

  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState('');
  const [activeLocationLabel, setActiveLocationLabel] = useState('');
  const navigate = useNavigate();
  const locationRequestedRef = useRef(false);
  const providersSectionRef = useRef<HTMLElement | null>(null);

  // جلب الموقع الحالي (تأكد إن الـ Hook ده شغال وبيرجع قيم)
  const { position, address, locating, detect, searchAddress } =
    useLocationCustom();

  useEffect(() => {
    if (locationRequestedRef.current) return;
    locationRequestedRef.current = true;
    void detect();
  }, [detect]);

  // 1. جلب الأقسام (الـ categories اللي أنت بعت الـ response بتاعها)
  const { data: categoriesData } = useServices();

  const categories = useMemo(() => {
    // الـ response اللي أنت بعته عبارة عن Array مباشر
    return Array.isArray(categoriesData)
      ? (categoriesData as ServiceCategory[])
      : [];
  }, [categoriesData]);

  // 2. جلب الفنيين بناءً على القسم المختار والموقع
  // الـ Hook ده مش هيشتغل (Enabled) إلا لو selectedServiceId أكبر من 0
  const { data: nearbyData, isLoading: isProvidersLoading } =
    useGetNearbyProviders(
      String(position.lat),
      String(position.lng),
      selectedServiceId,
    );

  const handleOpenRequest = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsDrawerOpen(true);
  };

  const { data: providers } = useGetNearbyProviders(
    String(position.lat),
    String(position.lng),
    selectedServiceId,
  );
  console.log(providers);
  // scroll to providers list section
  const scrollToProvidersList = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        providersSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  };

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
    setHasSearched(true);
    scrollToProvidersList();
  };

  const handleCategorySelect = (id: number, name: string) => {
    void runSearch(id, name);
  };

  // use data passed from AI (if any)

  const handledAiServiceIdRef = useRef<number | null>(null);
  const location = useLocation();
  const aiData = location.state as {
    serviceIdAI?: number;
    descriptionAI?: string;
    autoFill?: boolean;
  } | null;

  useEffect(() => {
    if (!aiData?.serviceIdAI || !categories.length) return;
    if (handledAiServiceIdRef.current === aiData.serviceIdAI) return;
    const matchedCategory = categories.find(
      (category) => category.id === aiData.serviceIdAI,
    );

    if (!matchedCategory) return;

    handledAiServiceIdRef.current = aiData.serviceIdAI;
    void runSearch(matchedCategory.id, matchedCategory.name);
  }, [aiData?.serviceIdAI, categories]);

  const handleHeroSearch = async (query: string, location: string) => {
    if (!categories.length) {
      setSearchFeedback(
        'جاري تحميل التخصصات حالياً، حاولي مرة ثانية بعد لحظة.',
      );
      return;
    }

    const matchedCategory = findMatchingCategory(query, categories);

    if (!matchedCategory) {
      setHasSearched(false);
      setSearchFeedback(
        `لم نجد تخصصاً مطابقاً لـ "${query}". اختاري من الأقسام المتاحة بالأسفل.`,
      );
      return;
    }

    await runSearch(matchedCategory.id, matchedCategory.name, location);
  };

  const reviewRequestIdFromNav = (location.state as any)?.reviewRequestId;

  useEffect(() => {
    if (reviewRequestIdFromNav) {
      setCompletedRequestId(reviewRequestIdFromNav);
      setShowReview(true);
    }
  }, [reviewRequestIdFromNav]);

  return (
    <main className="bg-background min-h-screen pb-20">
      <HeroSection onSearch={handleHeroSearch} isSearching={locating} />

      <div className="relative z-30 container mx-auto -mt-12 px-4">
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
        <section
          ref={providersSectionRef}
          className="container mx-auto mt-12 scroll-mt-24 px-6"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-black">
              {selectedCategoryName
                ? `متخصصون في ${selectedCategoryName}`
                : 'النتائج المتاحة'}
            </h2>
            {activeLocationLabel && (
              <p className="text-muted-foreground mt-2 text-sm font-bold">
                الموقع المستخدم في البحث: {activeLocationLabel}
              </p>
            )}
          </div>

          {isProvidersLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <ServiceSearchCardSkeleton key={index} />
              ))}
            </div>
          ) : providers.length > 0 ? (
            <ProvidersSearchList
              providers={providers}
              isLoading={isProvidersLoading}
              onServiceRequest={handleOpenRequest}
              onViewProfile={(provider) =>
                navigate(`/app/profile/provider/${provider.id}`)
              }
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-20 text-center">
              <SearchX className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="text-xl font-bold">لا يوجد فنيين حالياً</h3>
              <p className="text-muted-foreground mt-2">
                جرب اختيار قسم آخر أو تغيير المنطقة
              </p>
            </div>
          )}
        </section>
      )}

      <DirectServiceDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        ProviderId={selectedProvider?.id}
      />

      <ReviewDialog
        open={showReview}
        onClose={() => setShowReview(false)}
        requestId={completedRequestId ?? 0}
      />
    </main>
  );
}
