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

type ResourceConfig = QueryConfig | MutationConfig;

function isConfig(arg: unknown): arg is ResourceConfig {
  if (!arg || typeof arg !== 'object') return false;

  const configKeys = ['onSuccess', 'onError', 'enabled', 'staleTime', 'cacheTime', 'onSettled'];
  return configKeys.some((key) => key in (arg as object));
}

export function useResource<TData = any, TError = Error>(
  resource: any,
  operationName: string,
  paramsOrConfig?: any | ResourceConfig,
  maybeConfig?: ResourceConfig
): UseQueryResult<TData, TError> | UseMutationResult<TData, TError, any> {
  const operation = resource[operationName];

  if (!operation) {
    throw new Error(`Operation "${operationName}" not found in resource`);
  }

  const params = isConfig(paramsOrConfig) ? undefined : paramsOrConfig;
  const config = isConfig(maybeConfig) ? maybeConfig : paramsOrConfig;

  // Check HTTP method by analyze source code of function
  const isGet = operation.toString().includes('.get(');
  const isMutation = !isGet;

  if (isMutation) {
    const mutation = useMutation<TData, TError>({
      mutationFn: (variables) => operation(variables ?? params),
      onSuccess: config?.onSuccess,
      onError: config?.onError,
      onSettled: config?.onSettled,
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
    ...config,
    staleTime: config?.staleTime ?? 5 * 60 * 1000,
    cacheTime: config?.cacheTime ?? 30 * 60 * 1000,
    enabled: config?.enabled ?? true,
    onSuccess: config?.onSuccess,
    onError: config?.onError,
  });
}
