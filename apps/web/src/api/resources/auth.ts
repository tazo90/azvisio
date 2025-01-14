import { http } from '../http-client';
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
  login: (data: LoginDTO) => http.post('/auth/login', data),
  logout: () => http.post('/auth/logout'),
  refresh: (token: string) => http.post('/auth/refresh', { token }),
});
