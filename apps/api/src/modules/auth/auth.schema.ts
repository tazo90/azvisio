import { Static, Type as t } from '@sinclair/typebox';

export const LoginBody = t.Object({
  username: t.String(),
  password: t.String(),
});

export const LoginSchema = {
  tags: ['Auth'],
  body: LoginBody,
};

export interface LoginBody extends Static<typeof LoginBody> {}

export interface Auth extends Omit<LoginBody, 'password'> {
  roles: string[];
}
