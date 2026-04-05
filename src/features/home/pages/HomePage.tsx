
import { useState } from "react";
import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CatagoryList";
export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  function handleSearch(query: string, location: string) {
    console.log("search:", { query, location, category: selectedCategory });
    // TODO: navigate to results or filter providers
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#F0EFFE] to-background"
    >
      {/* Hero + Search */}
      <HeroSection onSearch={handleSearch} />

      {/* Categories */}
      <section className="px-4 pb-12">
        <CategoryList
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </section>
    </div>
  );
}
