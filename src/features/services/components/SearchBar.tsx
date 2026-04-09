
import { Search, MapPin, Briefcase } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch?: (query: string, location: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => { 
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch() {
    onSearch?.(query, location);
  }

  return (
    <div
   
      className="flex flex-row items-center h-19 w-full max-w-4xl mx-auto bg-white rounded-4xl shadow-sm overflow-hidden border border-transparent p-2"
    >
      {/* Service input */}
      <div className="flex items-center basis-1/2 gap-3 flex-1 px-4 py-3 border-l border-border/50">
        <Briefcase className="h-5 w-4 text-primary shrink-0" />
        <input
          type="text"
          placeholder="ما هي الخدمة التي تبحث عنها؟"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full font-medium bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Location input */}
      <div className="flex items-center basis-1/2 gap-3 px-4 py-3">
        <MapPin className="h-5 w-4 text-primary shrink-0" />
        <input
          type="text"
          placeholder="المدينة أو المنطقة"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full font-medium bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
        />
      </div>

      {/* Search button */}
      <Button
        type="button"
  variant="gradient"
  onClick={handleSearch}
  className="rounded-4xl px-10 py-4 h-full gap-2 text-lg font-bold"
      >
        <Search className="h-4.5 w-4.5" />
        بحث
      </Button>
    
    </div>
  );
}
export default SearchBar;
