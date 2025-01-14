import { http } from './http-client';

export type Resource = {
  basePath: string;
  operations: Record<string, (params?: any) => Promise<any>>;
};

export type ResourceConfig = {
  basePath: string;
  operations?: Record<string, (params?: any) => Promise<any>>;
};

export const createResource = (basePath: string) => ({
  basePath,
  operations: {
    list: () => http.get(basePath),
    get: (id: string) => http.get(`${basePath}/${id}`),
    create: (data: any) => http.post(basePath, data),
    update: ({ id, ...data }: any) => http.put(`${basePath}/${id}`, data),
    delete: (id: string) => http.delete(`${basePath}/${id}`),
  },
  extend: (customOperations: Record<string, (params?: any) => Promise<any>>) => ({
    basePath,
    operations: {
      ...createResource(basePath).operations,
      ...customOperations,
    },
  }),
});
