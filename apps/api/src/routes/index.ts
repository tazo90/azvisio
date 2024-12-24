import { FastifyInstance } from 'fastify';
import authRoutes from './api/auth';
import teamsRoutes from './api/teams';
import workspacesRoutes from './api/workspaces';
import usersRoutes from './api/users';

export async function registerRoutes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/api/auth' });
  app.register(teamsRoutes, { prefix: '/api/teams' });
  app.register(workspacesRoutes, { prefix: '/api/workspaces' });
  app.register(usersRoutes, { prefix: '/api/users' });
}
