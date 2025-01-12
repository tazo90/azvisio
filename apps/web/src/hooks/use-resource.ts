import { Resource } from '@/api/resource';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';

type QueryConfig = {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

type MutationConfig = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onSettled?: () => void;
};

export function useResource<TData = any, TError = Error>(
  resource: Resource,
  operation: string,
  params?: any,
  config: QueryConfig | MutationConfig = {}
): UseQueryResult<TData, TError> | UseMutationResult<TData, TError, any> {
  const operationFn = resource.operations[operation];

  if (!operationFn) {
    throw new Error(`Operation "${operation}" not found in resource`);
  }

  // Check HTTP method by analyze source code of function
  const operationSource = operationFn.toString();
  const isGet = operationSource.includes('api.get(');
  const isMutation = !isGet;

  if (isMutation) {
    const mutation = useMutation<TData, TError, any>({
      mutationFn: (variables: any) => operationFn(variables ?? params),
      onSuccess: (config as MutationConfig).onSuccess,
      onError: (error: TError) => {
        console.error(`Error in ${operation} operation:`, error);
        (config as MutationConfig).onError?.(error);
      },
      onSettled: (config as MutationConfig).onSettled,
    });

    return {
      ...mutation,
      // mutate as operation name
      [operation]: mutation.mutate,
    };
  }

  return useQuery<TData, TError>({
    queryKey: [resource.basePath, operation, params],
    queryFn: () => operationFn(params),
    staleTime: (config as QueryConfig).staleTime ?? 5 * 60 * 1000,
    cacheTime: (config as QueryConfig).cacheTime ?? 30 * 60 * 1000,
    enabled: (config as QueryConfig).enabled ?? true,
    onSuccess: (config as QueryConfig).onSuccess,
    onError: (config as QueryConfig).onError,
  });
}
