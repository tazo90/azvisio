import { api } from '../client';
import { createResource } from '../resource';

interface LoginDTO {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

export const auth = createResource('/auth').extend({
  login: (data: LoginDTO) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refresh: (token: string) => api.post('/auth/refresh', { token }),
});
