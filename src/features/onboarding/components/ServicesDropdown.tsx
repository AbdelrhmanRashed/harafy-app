import { Controller } from 'react-hook-form';
import { useServices } from '../hooks/useServices';
import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ServicesDropdown = ({ control, errors, name }: any) => {
  const { data: services, isLoading, error } = useServices();
  const [open, setOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        const selectedIds: number[] = field.value ?? [];

        const toggle = (id: number) => {
          const updated = selectedIds.includes(id)
            ? selectedIds.filter((v) => v !== id)
            : [...selectedIds, id];
          field.onChange(updated);
        };

        const remove = (id: number, e: React.MouseEvent) => {
          e.stopPropagation();
          field.onChange(selectedIds.filter((v) => v !== id));
        };

        const selectedServices = services?.filter((s: any) =>
          selectedIds.includes(s.id),
        );

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-invalid={!!errors[name]}
                className={cn(
                  'h-auto min-h-11 w-full justify-between rounded-lg px-3 py-2 font-normal',
                  !!errors[name] &&
                    'border-destructive focus-visible:ring-destructive',
                )}
              >
                <div className="flex flex-1 flex-wrap gap-1 text-right">
                  {selectedServices?.length > 0 ? (
                    selectedServices.map((s: any) => (
                      <Badge
                        key={s.id}
                        variant="secondary"
                        className="flex items-center gap-1 text-xs"
                      >
                        {s.name}
                        <X
                          size={10}
                          className="hover:text-destructive cursor-pointer transition-colors"
                          onClick={(e) => remove(s.id, e)}
                        />
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      -- اختر الحرفه --
                    </span>
                  )}
                </div>
                <ChevronsUpDown
                  size={14}
                  className="text-muted-foreground ms-2 shrink-0"
                />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0" align="start" dir="rtl">
              <Command>
                <CommandInput
                  placeholder="ابحث عن حرفه..."
                  className="text-right"
                />
                <CommandList>
                  <CommandEmpty>لا توجد نتائج</CommandEmpty>
                  <CommandGroup>
                    {services?.map((service: any) => {
                      const isSelected = selectedIds.includes(service.id);
                      return (
                        <CommandItem
                          key={service.id}
                          value={service.name}
                          onSelect={() => toggle(service.id)}
                          className="flex cursor-pointer items-center justify-between"
                        >
                          <span>{service.name}</span>
                          <Check
                            size={14}
                            className={cn(
                              'transition-opacity',
                              isSelected
                                ? 'text-primary opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};

export default ServicesDropdown;
