import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom"; 
import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CatagoryList";
import ProviderCard from "@/features/services/pages/instant/components/ProviderCard";
import { MOCK_PROVIDERS } from "@/features/services/pages/instant/types/constants";
import type { Provider } from "@/features/services/pages/instant/types/types";
import { useNavigate } from "react-router-dom";
export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const navigate = useNavigate();
  function handleSearch(query: string, location: string) {
    const searchParams = new URLSearchParams({
      q: query,
      loc: location,
      cat: selectedCategory
    }).toString();

    navigate(`/app/services/instant?${searchParams}`);
  }

  // 2. فلترة الفنيين لعرضهم في نفس الصفحة بناءً على القسم المختار
  const filteredProviders = useMemo(() => {
    if (!selectedCategory || selectedCategory === "الكل") return MOCK_PROVIDERS;
    // بنفلتر لو اسم المهنة بيحتوي على اسم القسم المختار
    return MOCK_PROVIDERS.filter((p) =>
      p.profession.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#F0EFFE] to-background"
    >
      {/* قسم الهيرو والبحث */}
      <HeroSection onSearch={handleSearch} />

      {/* قسم التصنيفات */}
      <section className="px-4 pb-12">
        <CategoryList
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* ─── عرض الفنيين تحت الـ Categories ─── */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {selectedCategory ? `فنيين ${selectedCategory}` : "أبرز الحرفيين"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider}
                selected={selectedProvider?.id === provider.id}
                onSelect={() => setSelectedProvider(provider)} />
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-border">
              <p className="text-muted-foreground">عذراً، لا يوجد فنيين في هذا القسم حالياً.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
