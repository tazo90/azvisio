import { FastifyInstance } from 'fastify';
import * as TeamSchema from './schemas/team.schema';

const TeamController = async (app: FastifyInstance) => {
  // Create team
  app.post('/', { schema: TeamSchema.CreateTeamSchema }, async (request) => {
    const teamService = app.service('teamService');

    return await teamService.createTeam(request.body);
  });

  // Invite to team
  app.post('/invite', async (request) => {
    const userId = request.user.id;

    const inviteToTeamUsecase = app.usecase('inviteToTeam');

    return await inviteToTeamUsecase.execute(userId, request.body as TeamSchema.InviteToTeamDto);
  });
};

export default TeamController;
