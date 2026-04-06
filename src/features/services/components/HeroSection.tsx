
import SearchBar from "./SearchBar";

interface HeroSectionProps {
  onSearch?: (query: string, location: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section

      className="w-full flex flex-col items-center text-center gap-6 py-16 px-6"
    >
      {/* Heading */}
      <div className="space-y-6 w-full leading-72">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground ">
          اكتشف أفضل الكفاءات <span className="block text-primary"> لمنزلك وأعمالك</span>
        </h1>
        <p className="text-muted-foreground text-base  lg:text-xl pb-6 px-5 leading-relaxed max-w-2xl mx-auto ">
         نجمع لك نخبة الحرفيين الموثوقين في مكان واحد، لتجربة صيانة وخدمات تتجاوز التوقعات.
        </p>
      </div>

      {/* Search */}
      <SearchBar onSearch={onSearch} />
    </section>
  );
}
export default HeroSection;
