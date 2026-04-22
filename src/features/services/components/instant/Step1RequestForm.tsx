import { useMemo, useEffect, useState } from 'react';
import RequestForm from '../RequestForm';
import { useGetNearbyProviders } from '../../hooks/useNearbyProviders';
import type { Provider } from '../../types/types';

type Step1RequestFormProps = {
  address: string;
  position: { lat: number; lng: number };
  locating: boolean;
  onDetect: () => void;
  onAddressSearch: (query: string) => void;
  onRequestCreated: (requestId: string) => void;
  onNearbyProvidersChange: (providers: Provider[]) => void;
  selectedProvider: Provider | null;
  onSelectProvider: (provider: Provider) => void;
  initialCategoryId?: number;
  serviceIdAI?: number;
  descriptionAI?: string;
};

export default function Step1RequestForm({
  address,
  position,
  locating,
  onDetect,
  onAddressSearch,
  onRequestCreated,
  onNearbyProvidersChange,
  serviceIdAI,
  descriptionAI,
}: Step1RequestFormProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(0);

  const { data: nearbyProviders } = useGetNearbyProviders(
    position?.lat.toString() ?? '',
    position?.lng.toString() ?? '',
    selectedServiceId,
  );

  const validProviders = useMemo(() => {
    const raw = Array.isArray(nearbyProviders)
      ? nearbyProviders
      : ((nearbyProviders as { data?: unknown } | undefined)?.data ?? []);
    return (raw as Record<string, unknown>[]).map((p) => ({
      ...p,
      baseLocation: p.baseLocation || {
        latitude: (p.position as { lat?: number })?.lat,
        longitude: (p.position as { lng?: number })?.lng,
        addressText: p.status || 'موقع غير محدد',
      },
      services: p.services || [{ id: p.profession, name: 'خدمة' }],
    })) as Provider[];
  }, [nearbyProviders]);

  useEffect(() => {
    onNearbyProvidersChange(validProviders);
  }, [validProviders, onNearbyProvidersChange]);

  return (
    <>
      <RequestForm
        navigateOnSuccess={false}
        address={address}
        position={position}
        locating={locating}
        onDetect={onDetect}
        onAddressSearch={onAddressSearch}
        onSend={(id) => onRequestCreated(String(id))}
        onServiceChange={setSelectedServiceId}
        serviceIdAI={serviceIdAI}
        descriptionAI={descriptionAI}
      />
      {/* <ProvidersList
        providers={validProviders}
        selectedId={selectedProvider?.id ?? null}
        onSelect={onSelectProvider}
        isLoading={isFetching}
      /> */}
    </>
  );
}
