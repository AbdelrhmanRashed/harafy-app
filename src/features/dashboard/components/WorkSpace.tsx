import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LayoutGrid, Layers, MessageSquare, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const WorkSpace = () => {
  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutGrid, isActive: true },
    { id: 'services', label: 'الخدمات', icon: Layers, isActive: false },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare, isActive: false },
  ];

  return (
    <Card className="bg-card overflow-hidden rounded-3xl border-none shadow-sm">
      <CardContent className="space-y-4 p-4">
        {/* Header Section */}
        <div className="flex items-center justify-between px-2">
          <h3 className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            مساحة العمل
          </h3>
          <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={item.isActive ? 'default' : 'ghost'}
              className={cn(
                'group relative flex w-full items-center justify-start gap-3 rounded-2xl px-4 py-6 transition-all duration-200',
                item.isActive
                  ? 'bg-primary-gradient shadow-primary-gradient text-primary-foreground font-bold'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  'flex items-center justify-center rounded-lg p-1.5 transition-colors',
                  item.isActive
                    ? 'text-primary-foreground'
                    : 'text-primary duration-200 group-hover:scale-110',
                )}
              >
                <item.icon size={20} />
              </div>

              {/* Label */}
              <span className="flex-1 text-right text-sm">{item.label}</span>

              {/* Indicator Arrow */}
              {item.isActive && (
                <ChevronLeft size={14} className="opacity-50" />
              )}
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default WorkSpace;
