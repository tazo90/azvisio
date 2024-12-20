import { Static, Type as t } from '@sinclair/typebox';

export const CreateTeamSchema = t.Object({
  name: t.String({ minLength: 3 }),
  description: t.Optional(t.String()),
  workspaceId: t.String({ format: 'uuid' }),
});

export const InviteToTeamSchema = t.Object({
  email: t.String({ format: 'email' }),
  role: t.Enum({ MEMBER: 'MEMBER', OWNER: 'OWNER' }),
  teamId: t.String({ format: 'uuid' }),
});

export type CreateTeamDto = Static<typeof CreateTeamSchema>;
export type InviteToTeamDto = Static<typeof InviteToTeamSchema>;
