import { Static, Type as t } from '@sinclair/typebox';

export const LoginSchema = {
  body: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 6 }),
  }),
};

export const RegisterSchema = {
  body: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 6 }),
  }),
};

export const RegisterConfirmSchema = {
  body: t.Object({
    token: t.String(),
  }),
};

export const LogoutSchema = {
  body: t.Object({
    refreshToken: t.String(),
  }),
};

export const RefreshSchema = {
  body: t.Object({
    refreshToken: t.String(),
  }),
};

export const PasswordResetRequestSchema = {
  body: t.Object({
    email: t.String({ format: 'email' }),
  }),
};

export const PasswordResetSchema = {
  body: t.Object({
    token: t.String(),
    password: t.String({ minLength: 6 }),
  }),
};

export type LoginDto = Static<typeof LoginSchema.body>;
export type RegisterDto = Static<typeof RegisterSchema.body>;
export type RegisterConfirmDto = Static<typeof RegisterConfirmSchema.body>;
export type PasswordResetDto = Static<typeof PasswordResetSchema.body>;
