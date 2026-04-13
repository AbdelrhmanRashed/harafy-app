import SearchBar from './SearchBar';

interface HeroSectionProps {
  onSearch?(query: string, location: string): void | Promise<void>;
  isSearching?: boolean;
}

const HeroSection = ({ onSearch, isSearching = false }: HeroSectionProps) => {
  return (
    <section className="flex w-full flex-col items-center gap-6 px-6 py-16 text-center">
      {/* Heading */}
      <div className="w-full space-y-6 leading-72">
        <h1 className="text-foreground text-5xl font-extrabold lg:text-7xl">
          اكتشف أفضل الكفاءات{' '}
          <span className="text-primary block"> لمنزلك وأعمالك</span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl px-5 pb-6 text-base leading-relaxed lg:text-xl">
          نجمع لك نخبة الحرفيين الموثوقين في مكان واحد، لتجربة صيانة وخدمات
          تتجاوز التوقعات.
        </p>
      </div>

      {/* Search */}
      <div className="animate-in fade-in zoom-in mt-4 w-full duration-700">
        <SearchBar onSearch={onSearch} isSearching={isSearching} />
      </div>
    </section>
  );
};
export default HeroSection;
