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
  login: (data: LoginDTO) => http.post('/login', data),
  logout: () => http.post('/logout'),
  refresh: (token: string) => http.post('/refresh', { token }),
});
