import type { UserRole } from '@/types/auth.types';

//return main role of user
export const getMainRole = (
  roles: string[],
  isProvider?: boolean,
): UserRole => {
  if (roles.includes('Admin')) return 'Admin';
  if (roles.includes('Provider') || isProvider) return 'Provider';
  if (roles.includes('Client')) return 'Client';

  return 'Guest';
};
