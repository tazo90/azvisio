import { FastifyInstance } from 'fastify';
import authRoutes from './api/auth';
import teamsRoutes from './api/teams';
import workspacesRoutes from './api/workspaces';

export async function registerRoutes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/api/auth' });
  app.register(teamsRoutes, { prefix: '/api/teams' });
  app.register(workspacesRoutes, { prefix: '/api/workspaces' });
}
