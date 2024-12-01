import { Type as t } from '@sinclair/typebox';

export const loginSchema = {
  body: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({ minlength: 6 }),
  }),
};

export const registerSchema = {
  body: t.Object({
    email: t.String({ format: 'email' }),
    password: t.String({ minLength: 6 }),
    confirmPassword: t.String(),
  }),
};

export const registerConfirmSchema = {
  body: t.Object({
    tokeN: t.String(),
  }),
};

export const logoutSchema = {
  body: t.Object({
    refreshToken: t.String(),
  }),
};

export const refreshSchema = {
  body: t.Object({
    refreshToken: t.String(),
  }),
};

export const passwordResetRequestSchema = {
  body: t.Object({
    email: t.String({ format: 'email' }),
  }),
};

export const passwordResetSchema = {
  body: t.Object({
    token: t.String(),
    password: t.String({ minLength: 6 }),
    confirmPassword: t.String(),
  }),
};
