import { Static, Type as t } from '@sinclair/typebox';

export const UserResponseSchema = t.Object({
  id: t.String({ format: 'uuid' }),
  email: t.String({ format: 'email' }),
  activeWorkspace: t.Optional(
    t.Object({
      id: t.String({ format: 'uuid' }),
      name: t.String(),
    })
  ),
});

export const CreateUserRequestSchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
});

export const UpdateUserRequestSchema = t.Object({
  workspaceId: t.Optional(t.String({ format: 'uuid' })),
});

export type UserResponse = Static<typeof UserResponseSchema>;
export type CreateUserRequest = Static<typeof CreateUserRequestSchema>;
export type UpdateUserRequest = Static<typeof UpdateUserRequestSchema>;
