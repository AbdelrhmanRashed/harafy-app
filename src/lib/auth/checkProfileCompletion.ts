export const hasCompletedProfile = (user: any) => {
  return !!(
    user.fullName &&
    user.phoneNumbers?.length > 0 &&
    user.governorateId &&
    user.regionId
  );
};
