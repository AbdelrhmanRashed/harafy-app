const AUTH_BASE = '/auth';
const ADMIN_BASE = '/admin';

export const ROUTES = {
  AUTH: {
    BASE: AUTH_BASE,
    SIGNIN: `${AUTH_BASE}/signin`,
    SIGNUP: `${AUTH_BASE}/signup`,
    VERIFY: `${AUTH_BASE}/verify`,
    REVIEW: `${AUTH_BASE}/review`,
  },

  CLIENT: {
    BASE: '/',
    DASHBOARD: '/dashboard',
    COMMUNITY: '/community',
    SERVICES: '/services',
    INSTANT_SERVICE: '/instant',
    DIRECT_SERVICE: '/direct',
    REQUESTS: '/requests',
    PROFILE: '/profile',
    PROFILE_SETTINGS: '/profile/settings',
  },

  ADMIN: {
    BASE: ADMIN_BASE,
    DASHBOARD: `${ADMIN_BASE}/dashboard`,
    CRAFTSMEN: `${ADMIN_BASE}/craftsmen`,
    CLIENTS: `${ADMIN_BASE}/clients`,
    ORDERS: `${ADMIN_BASE}/orders`,
    REPORTS: `${ADMIN_BASE}/reports`,
    SETTINGS: `${ADMIN_BASE}/settings`,
    ROLES: `${ADMIN_BASE}/roles`,
  },
};
