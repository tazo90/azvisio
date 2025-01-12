import { api } from '../api/client';

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
    list: () => api.get(basePath),
    get: (id: string) => api.get(`${basePath}/${id}`),
    create: (data: any) => api.post(basePath, data),
    update: ({ id, ...data }: any) => api.put(`${basePath}/${id}`, data),
    delete: (id: string) => api.delete(`${basePath}/${id}`),
  },
  extend: (customOperations: Record<string, (params?: any) => Promise<any>>) => ({
    basePath,
    operations: {
      ...createResource(basePath).operations,
      ...customOperations,
    },
  }),
});
