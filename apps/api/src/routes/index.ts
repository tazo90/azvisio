import { FastifyInstance } from 'fastify';
import authRoutes from './api/auth';

export async function registerRoutes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/api/auth' });
}
