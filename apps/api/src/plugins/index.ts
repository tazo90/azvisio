import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import { FastifyInstance } from 'fastify';
import auth from './custom/auth';
import db from './external/db';
import di from './external/di';

export async function registerPlugins(app: FastifyInstance) {
  // Custom
  await app.register(auth);

  // External
  await app.register(fastifyCors);
  await app.register(fastifyHelmet);
  await app.register(fastifyRateLimit);
  await app.register(db);
  await app.register(di);
}
