import { Card, CardContent } from '@/components/ui/card';
import { MapPin, SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

const PostsFilter = ({
  setSearch,
  setNearby,
}: {
  setSearch: (search: string) => void;
  setNearby: (nearby: boolean) => void;
}) => {
  const [mode, setMode] = useState<'all' | 'near'>('all');

  return (
    <Card className="bg-card w-full rounded-xl">
      <CardContent className="space-y-4 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">البحث والتصفية</h2>
          <span className="text-muted-foreground text-xs">
            استكشف المنشورات
          </span>
        </div>

        {/* Search */}
        <InputGroup className="bg-muted/40 h-10 rounded-lg border-none px-2">
          <InputGroupInput
            placeholder="ابحث في المنشورات..."
            className="border-none bg-transparent outline-none focus:border-none focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        {/*  Toggle */}
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(val: 'all' | 'near') => {
            if (val) setMode(val);
            setNearby(val === 'near');
          }}
          className="bg-muted/40 h-10 w-full overflow-hidden rounded-lg"
        >
          <ToggleGroupItem
            value="all"
            className="data-[state=on]:bg-primary h-full w-1/2 rounded-lg data-[state=on]:text-white"
          >
            كل المناطق
          </ToggleGroupItem>

          <ToggleGroupItem
            value="near"
            className="data-[state=on]:bg-primary h-full w-1/2 rounded-lg data-[state=on]:text-white"
          >
            <MapPin className="size-3.5" />
            الأقرب إليّ
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};

export default PostsFilter;
