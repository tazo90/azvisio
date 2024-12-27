import { FastifyInstance } from 'fastify';
import * as TeamSchema from './schemas/team.schema';
import { Team } from './entities/team.entity';

const TeamController = async (app: FastifyInstance) => {
  app.addHook('onRequest', app.authenticate);

  // Get all teams
  app.get('/', {}, async (request) => {
    const teams = await app.db.find(
      Team,
      {
        workspace: request.user.activeWorkspace,
      },
      {
        populate: ['invitations', 'members'],
      }
    );

    return teams;
  });

  // Create team
  app.post('/', { schema: TeamSchema.CreateTeamRequestSchema }, async (request) => {
    const userId = request.user.id;

    const createTeamUsecase = app.usecase('createTeam');

    return await createTeamUsecase.execute(userId, request.body);
  });

  // Invite to team
  app.post('/invite', { schema: TeamSchema.InviteToTeamRequestSchema }, async (request) => {
    const userId = request.user.id;

    const inviteToTeamUsecase = app.usecase('inviteToTeam');

    return await inviteToTeamUsecase.execute(userId, request.body);
  });
};

export default TeamController;
