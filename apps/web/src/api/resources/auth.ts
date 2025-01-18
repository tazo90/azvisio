import { http } from '../http-client';
import { createResource } from '../resource';

type LoginDTO = {
  email: string;
  password: string;
};

type RegisterDTO = LoginDTO;

type PasswordResetRequestDTO = {
  email: string;
};

type PasswordResetDTO = {
  password: string;
  token: string;
};

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
  passwordResetRequest: (data: PasswordResetRequestDTO) => http.post('/auth/password/request', data),
  passwordReset: (data: PasswordResetDTO) => http.post('/auth/password/reset', data),
});
