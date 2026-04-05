import { useQuery } from '@tanstack/react-query';
import { getClientProfile } from '../api/getClientProfile';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import axios from 'axios';

export const useClientProfile = () => {
  const updateUser = useAuthStore((s) => s.updateUserPartial);
  const user = useAuthStore((s) => s.user);

  const query = useQuery({
    queryKey: ['client-profile'],
    queryFn: getClientProfile,
  });

  useEffect(() => {
    if (!query.data) return;

    const fullName = query.data.firstName + ' ' + query.data.lastName;

    if (
      user?.fullName === fullName &&
      user?.pictureUrl === query.data.pictureUrl
    ) {
      return;
    }

    updateUser({
      fullName,
      pictureUrl: query.data.pictureUrl,
    });
  }, [query.data, updateUser, user]);

  return query;
};
