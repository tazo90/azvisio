import { QueryClient, DefaultOptions } from '@tanstack/react-query';

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  },
};

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions,
  });
