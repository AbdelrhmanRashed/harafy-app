import { mapStatus } from './mapProfileStatus';

export const mapUser = (user: any) => ({
  roles: user.role,
  isProvider: user.isProvider,
  status: mapStatus(user.status),
});
