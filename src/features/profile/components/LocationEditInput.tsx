import { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2, LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocationCustom } from '@/hooks/useLocation';
import { useUpdateProviderData } from '../hooks/useUpdateProviderLocation';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';

interface LocationEditInputProps {
  /** Existing provider data — needed to satisfy the server's required fields */
  provider: any;
  /** Called when the user cancels editing */
  onCancel: () => void;
  /** Called after a successful save */
  onSaved: () => void;
}

export default function LocationEditInput({
  provider,
  onCancel,
  onSaved,
}: LocationEditInputProps) {
  const { position, address, locating, denied, detect, searchAddress } =
    useLocationCustom();

  const [inputText, setInputText] = useState(
    provider?.baseLocation?.addressText ?? '',
  );
  const addressDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: clientProfile } = useClientProfile();
  const { mutate: saveLocation, isPending: isSaving } =
    useUpdateProviderData();

  // When GPS detect resolves a new address → fill the input
  useEffect(() => {
    if (address && address !== 'جاري تحديد الموقع...') {
      setInputText(address);
    }
  }, [address]);

  function handleAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputText(val);
    if (addressDebounce.current) clearTimeout(addressDebounce.current);
    addressDebounce.current = setTimeout(() => {
      if (val.trim().length > 3) searchAddress(val);
    }, 2000);
  }

  function handleSave() {
    // Merge existing provider fields with the new location
    // Server requires all fields even on PATCH
    saveLocation(
      {
        Bio: provider?.bio ?? '',
        Nickname: provider?.nickname ?? '',
        GovernorateId: clientProfile?.governorateId ?? provider?.governorateId ?? 0,
        RegionId: clientProfile?.regionId ?? provider?.regionId ?? 0,
        ServiceIds: (provider?.services ?? []).map((s: any) => s.id),
        BaseLocation: {
          AddressText: inputText,
          Latitude: position.lat,
          Longitude: position.lng,
        },
      },
      { onSuccess: onSaved },
    );
  }


  const isDisabled = locating || isSaving;
  const canSave = inputText.trim().length >= 3 && !isDisabled;

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Header */}
      <div className="flex w-full items-center justify-start gap-2">
        <MapPin className="text-primary h-5 w-5 shrink-0" />
        <span className="text-sm font-medium">تعديل العنوان</span>
      </div>

      {/* Input row */}
      <div className="flex w-full items-center gap-2 border-b pb-2">
        <input
          className="h-11 min-w-0 flex-1 rounded-md border border-primary/30 bg-background px-3 py-1 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60"
          placeholder="أدخل الموقع..."
          dir="rtl"
          value={inputText}
          onChange={handleAddressChange}
          disabled={isDisabled}
        />

        {/* GPS detect button */}
        <Button
          type="button"
          variant="gradient"
          size="icon"
          onClick={detect}
          disabled={isDisabled}
          title="تحديد موقعي تلقائياً"
          className="h-11 w-11 shrink-0 rounded-lg"
        >
          {locating ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <LocateFixed size={16} />
          )}
        </Button>
      </div>

      {/* Permission-denied hint */}
      {denied && (
        <p className="text-destructive w-full text-right text-xs">
          تم رفض إذن الموقع. يمكنك كتابة العنوان يدوياً.
        </p>
      )}

      {/* Action buttons */}
      <div className="flex w-full items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="cursor-pointer rounded-md border border-primary/30 bg-background px-3 py-1 text-sm font-semibold text-foreground outline-none hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          إلغاء
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="cursor-pointer rounded-md border border-primary/30 bg-background px-3 py-1 text-sm font-semibold text-foreground outline-none hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? (
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
