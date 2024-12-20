import { FastifyInstance } from 'fastify';
import * as WorkspaceSchema from './workspace.schema';
import { Workspace } from './workspace.entity';

const WorkspaceController = async (app: FastifyInstance) => {
  // Get workspaces
  app.get('/', async (request) => {
    const userId = request.user.id;

    return await app.db.find(Workspace, { ownerId: userId });
  });

  // Create workspace
  app.post('/', { schema: WorkspaceSchema.CreateWorkspaceSchema }, async (request) => {
    const userId = request.user.id;

    return await app.db.create(Workspace, {
      ...request.body,
      ownerId: userId,
    });
  });
};

export default WorkspaceController;
