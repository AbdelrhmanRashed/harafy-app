import { QueryClient } from '@tanstack/react-query';

const options = {
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
};

export const queryClient = new QueryClient(options);
