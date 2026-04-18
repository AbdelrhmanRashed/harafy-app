import type { Provider } from '../types/types';

/**
 * Safe extraction of provider image URL
 * Returns null if no image available
 */
export const getProviderImageUrl = (provider: Provider): string | null => {
  return provider.pictureUrl ?? null;
};

/**
 * Get provider initials for avatar fallback
 * Returns first character of name
 */
export const getProviderInitials = (provider: Provider): string => {
  return provider.name?.charAt(0) || '👤';
};

/**
 * Format rating to 1 decimal place
 * Returns "0.0" if no rating available
 */
export const formatRating = (rating: number | null | undefined): string => {
  if (rating === null || rating === undefined) return '0.0';
  return rating.toFixed(1);
};

/**
 * Get comma-separated list of services provider offers
 * Returns "خدمة عامة" if no services available
 */
export const getServicesList = (provider: Provider): string => {
  if (!provider.services || provider.services.length === 0) {
    return 'خدمة عامة';
  }
  return provider.services.map((service) => service.name).join('، ');
};

/**
 * Get provider's bio or nickname as fallback
 * Returns empty string if neither available
 */
export const getProviderBio = (provider: Provider): string => {
  return provider.bio || provider.nickname || '';
};

/**
 * Get provider's location address
 * Returns formatted address or default message
 */
export const getProviderLocation = (provider: Provider): string => {
  return provider.baseLocation?.addressText || 'موقع غير محدد';
};

/**
 * Get provider's latitude
 * Returns 0 if not available
 */
export const getProviderLatitude = (provider: Provider): number => {
  return provider.baseLocation?.latitude ?? 0;
};

/**
 * Get provider's longitude
 * Returns 0 if not available
 */
export const getProviderLongitude = (provider: Provider): number => {
  return provider.baseLocation?.longitude ?? 0;
};

/**
 * Check if provider has valid location data
 */
export const hasValidLocation = (provider: Provider): boolean => {
  return !!(
    provider.baseLocation &&
    typeof provider.baseLocation.latitude === 'number' &&
    typeof provider.baseLocation.longitude === 'number' &&
    provider.baseLocation.latitude !== 0 &&
    provider.baseLocation.longitude !== 0
  );
};

/**
 * Get reviews count or 0 if not available
 */
export const getReviewsCount = (provider: Provider): number => {
  return provider.reviewsCount ?? 0;
};

/**
 * Get jobs count or 0 if not available
 */
export const getJobsCount = (provider: Provider): number => {
  return provider.jobsCount ?? 0;
};

/**
 * Validate provider has required fields
 */
export const isProviderValid = (provider: Provider): boolean => {
  return !!(provider && provider.id && provider.name);
};

/**
 * Normalize raw API response to typed Provider
 * Adds validation and fills in defaults
 */
export const normalizeProvider = (data: any): Provider | null => {
  const providerName =
    data?.name || data?.full_name || data?.fullName || data?.nickname;

  if (!data || !data.id || !providerName) {
    console.warn('❌ Invalid provider data:', data);
    return null;
  }

  try {
    const normalized: Provider = {
      id: data.id,
      name: providerName,
      pictureUrl: data.pictureUrl ?? data.image ?? null,
      bio: data.bio || '',
      nickname: data.nickname || '',
      rating: data.rating ?? null,
      reviewsCount: data.reviewsCount ?? 0,
      jobsCount: data.jobsCount ?? 0,
      governorateId: data.governorateId ?? 0,
      regionId: data.regionId ?? 0,
      baseLocation: {
        id: data.baseLocation?.id ?? 0,
        latitude:
          parseFloat(
            String(
              data.baseLocation?.latitude ??
                data.position?.lat ??
                data.latitude ??
                0,
            ),
          ) || 0,
        longitude:
          parseFloat(
            String(
              data.baseLocation?.longitude ??
                data.position?.lng ??
                data.longitude ??
                0,
            ),
          ) || 0,
        addressText:
          data.baseLocation?.addressText || data.addressText || 'موقع غير محدد',
        providerId: data.baseLocation?.providerId ?? data.id,
      },
      services: Array.isArray(data.services)
        ? data.services.map((s: any) => ({
            id: s.id ?? 0,
            name: s.name || 'خدمة غير محددة',
          }))
        : [],
    };

    if (isProviderValid(normalized)) {
      return normalized;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

/**
 * Transform array of raw providers to typed array
 */
export const normalizeProviders = (data: any[]): Provider[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  const normalized = data
    .map((item) => normalizeProvider(item))
    .filter((provider): provider is Provider => provider !== null);

  return normalized;
};
