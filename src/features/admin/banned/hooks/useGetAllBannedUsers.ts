import { useQuery } from '@tanstack/react-query';
import { getAllBannedUsers } from '../api/getAllBannedUser';

export const useGetAllBannedUsers = () => {
  return useQuery({
    queryKey: ['banned-users'],
    queryFn: () => getAllBannedUsers(),
  });
};
