import { http } from './http-client';

export type Resource = {
  basePath: string;
  operations: Record<string, (params?: any) => Promise<any>>;
};

const createOperation = (basePath: string) => {
  const withBasePath = (path: string) => `${basePath}${path.startsWith('/') ? path : `/${path}`}`;

  return {
    get: (path: string, params?: any) => http.get(withBasePath(path), params),
    post: (path: string, data?: any) => http.post(withBasePath(path), data),
    put: (path: string, data?: any) => http.put(withBasePath(path), data),
    delete: (path: string, params?: any) => http.delete(withBasePath(path), params),
    patch: (path: string, data?: any) => http.patch(withBasePath(path), data),
  };
};

export const createResource = (basePath: string) => {
  const http = createOperation(basePath);

  const baseOperations = {
    list: () => http.get(''),
    get: (id: string) => http.get(`/${id}`),
    create: (data: any) => http.post('', data),
    update: ({ id, ...data }: any) => http.put(`/${id}`, data),
    delete: (id: string) => http.delete(`/${id}`),
  };

  const resource = {
    ...baseOperations,
    basePath,
    extend: (customOperations: Record<string, (params?: any) => Promise<any>>) => ({
      ...baseOperations,
      ...customOperations,
      basePath,
    }),
  };

  return resource;
};
