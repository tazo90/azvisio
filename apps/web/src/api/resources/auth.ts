import { http } from '../http-client';
import { createResource } from '../resource';

type LoginDTO = {
  email: string;
  password: string;
};

type RegisterDTO = LoginDTO;

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

export const auth = createResource('/auth').extend({
  login: (data: LoginDTO) => http.post('/auth/login', data),
  logout: () => http.post('/auth/logout'),
  register: (data: RegisterDTO) => http.post('/auth/register', data),
  refresh: (token: string) => http.post('/auth/refresh', { token }),
});
