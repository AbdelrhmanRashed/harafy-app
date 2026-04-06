import { mapProfileStatus } from './mapProfileStatus';

export const mapUser = (user: any) => ({
  roles: user.role,
  isProvider: user.isProvider,
  profileStatus: mapProfileStatus(user.status),
});
