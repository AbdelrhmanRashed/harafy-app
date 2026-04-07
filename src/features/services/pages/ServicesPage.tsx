import { useState, useMemo } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CatagoryList";
import ServiceSearchCard from "../components/ServiceSearchCard";
import { MOCK_PROVIDERS } from "@/features/services/pages/instant/types/constants";
import { useNavigate } from "react-router-dom";
import { DirectRequestForm } from "../components/DirectRequestForm";
import type { Provider } from "./instant/types/types";
export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();
  function handleSearch(query: string, location: string) {
    const searchParams = new URLSearchParams({
      q: query,
      loc: location,
      cat: selectedCategory
    }).toString();

    navigate(`/app/services/instant?${searchParams}`);
  }
  const handleOpenRequest = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsDrawerOpen(true);
  };


  const filteredProviders = useMemo(() => {
    if (!selectedCategory || selectedCategory === "الكل") return MOCK_PROVIDERS;
    return MOCK_PROVIDERS.filter((p) =>
      p.profession.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0EFFE] to-background">
      <main className="p-4 pb-12">
        <HeroSection onSearch={handleSearch} />

        <section className="px-4 pb-12">
          <CategoryList
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="max-w-4xl mx-auto mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory ? `فنيين ${selectedCategory}` : "أبرز الحرفيين"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProviders.map((provider) => (
                <ServiceSearchCard
                  key={provider.id}
                  provider={provider}
                  onServiceRequest={handleOpenRequest}
                  onViewProfile={(p) => console.log("view profile of ", p.name)}
                // navigate(`/app/services/providers/${provider.id}`)
                />
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-border">
                <p className="text-muted-foreground">عذراً، لا يوجد فنيين في هذا القسم حالياً.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      {/* Direct Request Sidebar */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
        <DrawerContent className="w-full max-w-md">
          {selectedProvider && (
            <DirectRequestForm
              provider={selectedProvider}
              onClose={() => setIsDrawerOpen(false)}
            />
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
