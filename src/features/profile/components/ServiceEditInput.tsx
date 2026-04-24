import { useState } from 'react';
import { Loader2, Check, ChevronsUpDown, X } from 'lucide-react';
import { useUpdateProviderData } from '../hooks/useUpdateProviderLocation';
import { useServices } from '@/features/onboarding/hooks/useServices';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';

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
import { cn } from '@/lib/utils';

interface ServiceEditInputProps {
  provider: any;
  onCancel: () => void;
  onSaved: () => void;
}

export default function ServiceEditInput({
  provider,
  onCancel,
  onSaved,
}: ServiceEditInputProps) {
  const { data: allServices, isLoading: isLoadingServices } = useServices();

  // Initial selected IDs from provider's current services
  const [selectedIds, setSelectedIds] = useState<number[]>(
    (provider?.services ?? []).map((s: any) => s.id),
  );

  const [open, setOpen] = useState(false);

  const { data: clientProfile } = useClientProfile();
  const { mutate: save, isPending } = useUpdateProviderData();

  const toggle = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((v) => v !== id);
      }
      // Limit to max 2 services
      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const remove = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => prev.filter((v) => v !== id));
  };

  const handleSave = () => {
    save(
      {
        Bio: provider?.bio ?? '',
        Nickname: provider?.nickname ?? '',
        GovernorateId:
          clientProfile?.governorateId ?? provider?.governorateId ?? 0,
        RegionId: clientProfile?.regionId ?? provider?.regionId ?? 0,
        ServiceIds: selectedIds,
        BaseLocation: {
          AddressText: provider?.baseLocation?.addressText ?? '',
          Latitude: provider?.baseLocation?.latitude ?? 0,
          Longitude: provider?.baseLocation?.longitude ?? 0,
        },
      },
      { onSuccess: onSaved },
    );
  };

  const selectedServices = allServices?.filter((s: any) =>
    selectedIds.includes(s.id),
  );

  const canSave = selectedIds.length > 0 && !isPending;

  return (
    <div className="space-y-4">
      {/* Services Dropdown */}
      <div className="space-y-1">
        <label className="text-muted-foreground flex items-center justify-between text-xs font-medium">
          <span>اختر الخدمات التي تقدمها</span>
          <span className="text-muted-foreground/80 bg-primary/10 rounded-full px-2 py-0.5 text-[10px]">
            يمكنك اختيار حرفتين كحد أقصى ( {selectedIds.length} / 2 )
          </span>
        </label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={isLoadingServices || isPending}
              className="h-auto min-h-11 w-full justify-between rounded-lg px-3 py-2 font-normal"
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
                    {isLoadingServices
                      ? 'جاري التحميل...'
                      : '-- اختر الحرفه --'}
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
                  {allServices?.map((service: any) => {
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
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 border-t pt-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="border-primary/30 bg-background text-foreground hover:bg-primary/10 cursor-pointer rounded-md border px-3 py-1.5 text-sm font-semibold outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          إلغاء
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="border-primary/30 bg-background text-foreground hover:bg-primary/10 cursor-pointer rounded-md border px-3 py-1.5 text-sm font-semibold outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <span className="flex items-center gap-1">
              <Loader2 className="animate-spin" size={13} />
              جاري الحفظ...
            </span>
          ) : (
            'حفظ'
          )}
        </button>
      </div>
    </div>
  );
}
