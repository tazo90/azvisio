import { Static, Type as t } from '@sinclair/typebox';

export const CreateTeamRequestSchema = t.Object({
  name: t.String({ minLength: 3 }),
  description: t.Optional(t.String()),
  workspaceId: t.String({ format: 'uuid' }),
});

export const InviteToTeamRequestSchema = t.Object({
  email: t.String({ format: 'email' }),
  role: t.Enum({ MEMBER: 'MEMBER', OWNER: 'OWNER' }),
  teamId: t.String({ format: 'uuid' }),
});

export type CreateTeamRequest = Static<typeof CreateTeamRequestSchema>;
export type InviteToTeamRequest = Static<typeof InviteToTeamRequestSchema>;
