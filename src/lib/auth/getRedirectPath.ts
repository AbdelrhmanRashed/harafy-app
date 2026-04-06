import { getMainRole } from './getMainRole';

type ProfileStatus =
  | 'Pending'
  | 'UnderReview'
  | 'Approved'
  | 'Rejected'
  | 'Suspended'
  | 'Completed';

interface UserData {
  roles: string[];
  isProvider?: boolean;
  profileStatus: ProfileStatus;
}

export const getRedirectPath = (user: UserData) => {
  const role = getMainRole(user.roles, user.isProvider);

  // 🟣 Admin
  if (role === 'Admin') return '/admin';

  // 🔴 Suspended
  if (user.profileStatus === 'Suspended') {
    return '/suspended';
  }

  // 🟡 Pending → onboarding
  if (user.profileStatus === 'Pending') {
    return '/onboarding/user-profile';
  }

  // 🟠 UnderReview (Provider only)
  if (role === 'Provider' && user.profileStatus === 'UnderReview') {
    return '/onboarding/review';
  }

  // 🔁 Rejected 
  if (user.profileStatus === 'Rejected') {
    return '/onboarding/user-profile';
  }

  // 🟢 Approved / Completed
  if (user.profileStatus === 'Approved' || user.profileStatus === 'Completed') {
    if (role === 'Provider') return '/provider';
    return '/app'; // Client
  }

  return '/';
};
