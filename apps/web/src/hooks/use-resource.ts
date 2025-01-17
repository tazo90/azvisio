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
  resource: any,
  operationName: string,
  params?: any,
  config: QueryConfig | MutationConfig = {}
): UseQueryResult<TData, TError> | UseMutationResult<TData, TError, any> {
  const operation = resource[operationName];

  if (!operation) {
    throw new Error(`Operation "${operationName}" not found in resource`);
  }

  // Check HTTP method by analyze source code of function
  const operationSource = operation.toString();
  const isGet = operationSource.includes('.get(');
  const isMutation = !isGet;

  if (isMutation) {
    const mutation = useMutation<TData, TError, any>({
      mutationFn: (variables: any) => operation(variables ?? params),
      onSuccess: (config as MutationConfig).onSuccess,
      onError: (error: TError) => {
        console.error(`Error in ${operationName} operation:`, error);
        (config as MutationConfig).onError?.(error);
      },
      onSettled: (config as MutationConfig).onSettled,
    });

    return {
      ...mutation,
      // mutate as operation name
      [operationName]: mutation.mutate,
    };
  }

  return useQuery<TData, TError>({
    queryKey: [resource.basePath, operationName, params],
    queryFn: () => operation(params),
    staleTime: (config as QueryConfig).staleTime ?? 5 * 60 * 1000,
    cacheTime: (config as QueryConfig).cacheTime ?? 30 * 60 * 1000,
    enabled: (config as QueryConfig).enabled ?? true,
    onSuccess: (config as QueryConfig).onSuccess,
    onError: (config as QueryConfig).onError,
  });
}
