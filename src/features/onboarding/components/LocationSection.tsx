import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import { Button } from '@/components/ui/button';
import { MapPin, Loader2, LocateFixed, AlertCircle } from 'lucide-react';

import { useLocation } from '@/hooks/useLocation';

export function LocationSection() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const {
    position,
    setPosition,
    address,
    locating,
    denied,
    detect,
    searchAddress,
  } = useLocation();

  // ── keep form in sync whenever the hook resolves a new position ──
  useEffect(() => {
    setValue('BaseLocation.Latitude', position.lat, { shouldValidate: true });
    setValue('BaseLocation.Longitude', position.lng, { shouldValidate: true });
  }, [position.lat, position.lng, setValue]);

  useEffect(() => {
    setValue('BaseLocation.AddressText', address, { shouldValidate: true });
  }, [address, setValue]);

  // ── debounced address → geocode ──
  const addressDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setValue('BaseLocation.AddressText', val);
    if (addressDebounce.current) clearTimeout(addressDebounce.current);
    addressDebounce.current = setTimeout(() => {
      if (val.trim().length > 3) searchAddress(val);
    }, 800);
  }

  // ── lat/lng manual edit → reverse geocode ──
  // const coordDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  // function handleCoordChange() {
  //   if (coordDebounce.current) clearTimeout(coordDebounce.current);
  //   coordDebounce.current = setTimeout(() => {
  //     const lat = parseFloat(watch('BaseLocation.Latitude'));
  //     const lng = parseFloat(watch('BaseLocation.Longitude'));
  //     if (!isNaN(lat) && !isNaN(lng)) {
  //       setPosition({ lat, lng }); // triggers reverseGeocode inside hook
  //     }
  //   }, 800);
  // }
  const baseLocationErrors = errors.BaseLocation as any;

  return (
    <div className="space-y-3">
      {/* Address */}
      <Field data-invalid={!!baseLocationErrors?.AddressText}>
        <FieldLabel>العنوان التفصيلي</FieldLabel>
        <div className="flex gap-2">
          <InputGroup className="flex-1 rounded-lg px-3 py-5">
            <InputGroupInput
              {...register('BaseLocation.AddressText')}
              onChange={handleAddressChange}
              placeholder="مثال: شارع الجيش، بجوار مسجد النور"
              disabled={locating}
            />
            <InputGroupAddon align="inline-start">
              {locating ? (
                <Loader2 className="text-primary animate-spin" size={16} />
              ) : (
                <MapPin className="text-muted-foreground" />
              )}
            </InputGroupAddon>
          </InputGroup>

          {/* GPS detect button */}
          <Button
            type="button"
            variant="gradient"
            size="icon"
            onClick={detect}
            disabled={locating}
            title="تحديد موقعي تلقائياً"
            className="h-full min-h-[42px] w-11 shrink-0 cursor-pointer rounded-lg px-3"
          >
            {locating ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <LocateFixed size={16} />
            )}
          </Button>
        </div>

        {baseLocationErrors?.AddressText && (
          <FieldError>{baseLocationErrors.AddressText.message}</FieldError>
        )}

        {denied && (
          <p className="text-destructive flex items-center gap-1 text-xs">
            <AlertCircle size={13} />
            تم رفض إذن الموقع. يمكنك كتابة العنوان يدوياً.
          </p>
        )}
      </Field>

      {/* Lat / Lng */}
      {/* <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Field data-invalid={!!errors.BaseLocation?.Latitude}>
          <FieldLabel>خط العرض (Latitude)</FieldLabel>
          <Input
            type="number"
            step="any"
            {...register('BaseLocation.Latitude', {
              onChange: handleCoordChange,
            })}
            placeholder="30.0444"
            disabled={locating}
            className="rounded-lg"
          />
          {errors.BaseLocation?.Latitude && (
            <FieldError>{errors.BaseLocation.Latitude.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.BaseLocation?.Longitude}>
          <FieldLabel>خط الطول (Longitude)</FieldLabel>
          <Input
            type="number"
            step="any"
            {...register('BaseLocation.Longitude', {
              onChange: handleCoordChange,
            })}
            placeholder="31.2357"
            disabled={locating}
            className="rounded-lg"
          />
          {errors.BaseLocation?.Longitude && (
            <FieldError>{errors.BaseLocation.Longitude.message}</FieldError>
          )}
        </Field>
      </div> */}

      <FieldDescription>
        اضغط على <LocateFixed size={12} className="inline" /> لتحديد موقعك
        تلقائياً، أو اكتب العنوان وسيتم تحديد الإحداثيات تلقائياً
      </FieldDescription>
    </div>
  );
}
