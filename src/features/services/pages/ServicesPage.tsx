import { useState, useMemo } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Loader2, SearchX } from 'lucide-react';

import HeroSection from '../components/HeroSection';
import CategoryList from '../components/CatagoryList';
import ProvidersList from '../components/ProvidersList';
import { DirectRequestForm } from '../components/DirectRequestForm';

import { useLocation } from '../hooks/useLocation';
import { useGetNearbyProviders } from '../hooks/useNearbyProviders';
import { useServices } from '@/features/onboarding/hooks/useServices';
import type { Provider } from '../types/types';
import ProvidersSearchList from '../components/ProvidersSearchList';
import { useNavigate } from 'react-router-dom';

export default function ServicesPage() {
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // جلب الموقع الحالي (تأكد إن الـ Hook ده شغال وبيرجع قيم)
  const { position } = useLocation();

  // 1. جلب الأقسام (الـ categories اللي أنت بعت الـ response بتاعها)
  const { data: categoriesData } = useServices();

  const categories = useMemo(() => {
    // الـ response اللي أنت بعته عبارة عن Array مباشر
    return Array.isArray(categoriesData) ? categoriesData : [];
  }, [categoriesData]);

  // 2. جلب الفنيين بناءً على القسم المختار والموقع
  // الـ Hook ده مش هيشتغل (Enabled) إلا لو selectedServiceId أكبر من 0
  const { data: nearbyData, isLoading: isProvidersLoading } = useGetNearbyProviders(
    String(position.lat),
    String(position.lng),
    selectedServiceId
  );
  const handleOpenRequest = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsDrawerOpen(true);
  };

  // أهم خطوة: استخراج البيانات من الـ Response بتاع الفنيين
  const providers = useMemo(() => {
    if (!nearbyData) return [];
    // جرب لو الداتا جوه property اسمها data أو هي Array مباشر
    const rawData = Array.isArray(nearbyData) ? nearbyData : (nearbyData as any).data || [];

    // هنا بنعمل Mapping عشان نتأكد إن شكل البيانات مطابق للـ Interface بتاعنا
    return rawData.map((p: any) => ({
      ...p,
      id: p.id,
      name: p.name || p.full_name || "فني متخصص",
      rating: p.rating || 5,
      // تأكد إن الـ services موجودة عشان الـ Card ميعملش Crash
      services: p.services || [{ id: selectedServiceId, name: selectedCategoryName }]
    })) as Provider[];
  }, [nearbyData, selectedServiceId, selectedCategoryName]);

  const handleCategorySelect = (id: number, name: string) => {
    console.log("Selected Category ID:", id); // للتأكد في الـ Console
    setSelectedServiceId(id);
    setSelectedCategoryName(name);
    setHasSearched(true); // دي اللي بتفتح قسم النتائج
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      <HeroSection onSearch={(q) => console.log("Search for:", q)} />

      <div className="container mx-auto mt-[-3rem] relative z-30 px-4">
        <CategoryList
          categories={categories}
          selectedId={selectedServiceId}
          onSelect={handleCategorySelect}
        />
      </div>

      {/* قسم عرض الفنيين: لا يظهر إلا بعد اختيار قسم */}
      {hasSearched && (
        <section className="container mx-auto mt-12 px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-black">
              {selectedCategoryName ? `متخصصون في ${selectedCategoryName}` : 'النتائج المتاحة'}
            </h2>
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
          className="fixed inset-y-0 right-0 z-50 mt-0 h-full max-w-none! border-l bg-background outline-none w-full md:w-[500px]! rounded-none"
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