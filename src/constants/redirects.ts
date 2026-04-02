import type { UserRole } from '@/types/auth.types';

// TODO: Add redirect to page depending on user role
export const ROLE_REDIRECT: Record<UserRole, string> = {
  Admin: '/admin',
  Client: '/app',
  Provider: '/provider',
  Guest: '/',
};
