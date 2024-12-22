import { Static, Type as t } from '@sinclair/typebox';

export const UserSchema = t.Object({
  id: t.String({ format: 'uuid' }),
  email: t.String({ format: 'email' }),
});

export const CreateUserSchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
});

export type UserDto = Static<typeof UserSchema.body>;
export type CreateUserDto = Static<typeof CreateUserSchema.body>;
