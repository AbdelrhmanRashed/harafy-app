import { getMainRole } from './getMainRole';

type status =
  | 'Pending'
  | 'UnderReview'
  | 'Approved'
  | 'Rejected'
  | 'Suspended'
  | 'Completed';

interface UserData {
  roles: string[];
  isProvider?: boolean;
  status: status;
}

export const getRedirectPath = (user: UserData) => {
  const role = getMainRole(user.roles, user.isProvider);

  //  Admin
  if (role === 'Admin') return '/admin';

  //  Suspended
  if (user.status === 'Suspended') {
    return '/suspended';
  }

  //  Pending → onboarding
  if (user.status === 'Pending') {
    return '/onboarding/user-profile';
  }

  //  UnderReview (Provider only)
  if (role === 'Provider' && user.status === 'UnderReview') {
    return '/onboarding/review';
  }

  //  Rejected
  if (user.status === 'Rejected') {
    return '/onboarding/user-profile';
  }

  //  Approved / Completed
  if (user.status === 'Approved' || user.status === 'Completed') {
    if (role === 'Provider') return '/provider';
    return '/app'; // Client
  }

  return '/';
};
