import { FastifyInstance } from 'fastify';
import * as WorkspaceSchema from './workspace.schema';
import { Workspace } from './workspace.entity';

const WorkspaceController = async (app: FastifyInstance) => {
  app.addHook('onRequest', app.authenticate);

  const serializer = { fields: ['id', 'name', 'teams.id', 'teams.name'] };

  // Get workspaces
  app.get('/', async (request) => {
    return await app.db.find(Workspace, { owner: request.user }, serializer);
  });

  // Create workspace
  app.post('/', { schema: WorkspaceSchema.CreateWorkspaceSchema }, async (request) => {
    return await app.db.createFast(
      Workspace,
      {
        ...request.body,
        owner: request.user,
      },
      serializer
    );
  });
};

export default WorkspaceController;
