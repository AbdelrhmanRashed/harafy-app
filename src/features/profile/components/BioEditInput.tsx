import { useState } from 'react';
import { Loader2, AlignLeft, User } from 'lucide-react';
import { useUpdateProviderData } from '../hooks/useUpdateProviderLocation';
import { useClientProfile } from '@/features/profile/hooks/useClientProfile';

interface BioEditInputProps {
  /** Existing provider data — needed to send all required server fields */
  provider: any;
  /** Called when user cancels */
  onCancel: () => void;
  /** Called after successful save */
  onSaved: () => void;
}

export default function BioEditInput({
  provider,
  onCancel,
  onSaved,
}: BioEditInputProps) {
  const [nickname, setNickname] = useState(provider?.nickname ?? '');
  const [bio, setBio] = useState(provider?.bio ?? '');

  const { data: clientProfile } = useClientProfile();
  const { mutate: save, isPending } = useUpdateProviderData();

  function handleSave() {
    save(
      {
        Bio: bio,
        Nickname: nickname,
        GovernorateId:
          clientProfile?.governorateId ?? provider?.governorateId ?? 0,
        RegionId: clientProfile?.regionId ?? provider?.regionId ?? 0,
        ServiceIds: (provider?.services ?? []).map((s: any) => s.id),
        BaseLocation: {
          AddressText: provider?.baseLocation?.addressText ?? '',
          Latitude: provider?.baseLocation?.latitude ?? 0,
          Longitude: provider?.baseLocation?.longitude ?? 0,
        },
      },
      { onSuccess: onSaved },
    );
  }

  const canSave = nickname.trim().length >= 1 && !isPending;

  return (
    <div className="space-y-4">
      {/* Nickname field */}
      <div className="space-y-1">
        <label className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
          <User size={13} />
          اسم الشهرة
        </label>
        <input
          className="border-primary/30 bg-background text-foreground focus:border-primary h-10 w-full rounded-md border px-3 text-sm outline-none disabled:opacity-60"
          dir="rtl"
          placeholder="مثال: أبو محمد النجار"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={isPending}
        />
      </div>

      {/* Bio field */}
      <div className="space-y-1">
        <label className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
          <AlignLeft size={13} />
          نبذة تعريفية
        </label>
        <textarea
          className="border-primary/30 bg-background text-foreground focus:border-primary min-h-[100px] w-full resize-none rounded-md border px-3 py-2 text-sm outline-none disabled:opacity-60"
          dir="rtl"
          placeholder="اكتب نبذة مختصرة عن خبرتك وخدماتك..."
          maxLength={300}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={isPending}
        />
        <p className="text-muted-foreground text-left text-xs">
          {bio.length} / 300
        </p>
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
