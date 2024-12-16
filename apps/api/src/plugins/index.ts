import { FastifyInstance } from 'fastify';

import auth from './custom/auth';
import authorization from './custom/authorization';
import scrypt from './custom/scrypt';

import cors, { autoConfig as corsConfig } from './external/cors';
import db from './external/db';
import di from './external/di';
import env from './external/env';
import helmet from './external/helmet';
import mail from './external/mail';
import multipart, { autoConfig as multipartConfig } from './external/multipart';
import rateLimit, { autoConfig as rateLimitConfig } from './external/rate-limit';
import sensible from './external/sensible';
import session from './external/session';
import staticFiles, { autoConfig as staticFilesConfig } from './external/static';
import swagger from './external/swagger';
import underPressure, { autoConfig as underPressureConfig } from './external/under-pressure';

export async function registerPlugins(app: FastifyInstance) {
  // Custom
  await app.register(auth);
  await app.register(authorization);
  // await app.register(scrypt);

  // External
  await app.register(cors, corsConfig);
  await app.register(db);
  await app.register(di);
  await app.register(env);
  await app.register(helmet);
  await app.register(mail);
  await app.register(multipart, multipartConfig);
  await app.register(rateLimit, rateLimitConfig);
  await app.register(sensible);
  await app.register(session);
  await app.register(staticFiles, staticFilesConfig);
  await app.register(swagger);
  // await app.register(underPressure, underPressureConfig);
}
