import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Sun, SlidersHorizontal } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Themes = [
  {
    value: 'light',
    label: 'الوضع النهاري',
    icon: Sun,
  },
  {
    value: 'dark',
    label: 'الوضع الليلي',
    icon: Moon,
  },
];
import { useThemeStore } from '@/store/useThemeStore';

const PreferenceCard = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="border-primary/10 flex items-center gap-2 border-b-2 pb-2">
          <SlidersHorizontal className="text-primary h-5 w-5" />
          <p className="text-primary text-lg font-bold">التفضيلات</p>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="max-w-xs">
          <p className="text-muted-foreground mb-2 text-sm font-semibold">
            الثيم المفضل
          </p>

          <Select
            value={theme}
            onValueChange={(value) => setTheme(value as 'light' | 'dark')}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {Themes.map((t) => {
                const Icon = t.icon;

                return (
                  <SelectItem key={t.value} value={t.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {t.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferenceCard;
