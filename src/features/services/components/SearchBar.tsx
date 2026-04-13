import { Search, MapPin, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: (query: string, location: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  function handleSearch() {
    if (!query?.trim()) return;
    onSearch?.(query.trim(), location.trim());
  }

  return (
    <div
      className={`group relative mx-auto w-full max-w-4xl transition-all duration-500 ease-out ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}
    >
      <div
        className={`dark:bg-card/90 relative flex w-full flex-col items-center rounded-[2.2rem] bg-white/80 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-2 backdrop-blur-xl transition-all duration-300 md:flex-row ${isFocused ? 'ring-primary shadow-primary/10' : 'ring-border/50'}`}
      >
        <div className="border-border/40 group/input flex w-full flex-1 items-center gap-3 border-l-0 px-6 py-4 md:border-l">
          <div className="bg-primary/10 text-primary rounded-xl p-2 transition-transform group-hover/input:scale-110">
            <Briefcase className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="ما هي الخدمة التي تبحث عنها؟"
            value={query}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
            className="text-foreground placeholder:text-muted-foreground/50 w-full bg-transparent text-sm font-semibold outline-none md:text-lg"
          />
        </div>

        <div className="group/input flex w-full flex-1 items-center gap-3 px-6 py-4">
          <div className="bg-primary/10 text-primary rounded-xl p-2 transition-transform group-hover/input:scale-110">
            <MapPin className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="المدينة أو المنطقة"
            value={location}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setLocation(e.target.value)}
            className="text-foreground placeholder:text-muted-foreground/50 w-full bg-transparent text-sm font-semibold outline-none md:text-lg"
          />
        </div>

        <Button
          type="button"
          variant={'gradient'}
          onClick={handleSearch}
          className="shadow-primary-gradient w-full gap-3 rounded-[1.8rem] px-12 py-7 text-lg font-black transition-all active:scale-95 md:me-2 md:w-auto"
        >
          <Search className="h-5 w-5 stroke-[3px]" />
          بحث
        </Button>
      </div>

      <div className="mt-4 flex justify-center gap-4 px-6 md:justify-start">
        <span className="text-muted-foreground/70 text-xs font-bold tracking-widest uppercase">
          شائع:
        </span>
        {['سباك', 'كهربائي', 'نجار'].map((tag) => (
          <button
            key={tag}
            className="text-primary text-xs font-bold underline-offset-4 hover:underline"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
