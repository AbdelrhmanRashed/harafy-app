import type { UserRole } from '@/types/auth.types';

//return main role of user
export const getMainRole = (
  roles?: string[],
  isProvider?: boolean,
): UserRole => {
  if (!roles || roles.length === 0) return 'Guest';

  if (roles.includes('Admin')) return 'Admin';

  if (roles.includes('Provider') || isProvider === true) return 'Provider';

  if (roles.includes('Client')) return 'Client';

  return 'Guest';
};
