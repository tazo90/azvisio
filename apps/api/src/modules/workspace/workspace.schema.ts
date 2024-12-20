import { Static, Type as t } from '@sinclair/typebox';

export const CreateWorkspaceSchema = t.Object({
  name: t.String({ minLength: 3 }),
  description: t.Optional(t.String()),
});

export type CreateWorkspaceDto = Static<typeof CreateWorkspaceSchema>;
