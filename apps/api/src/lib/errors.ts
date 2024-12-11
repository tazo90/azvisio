import createError from '@fastify/error';

export const SessionNotFound = createError('Not found', 'Session not found', 404);

export const AuthError = createError('AuthError', 'Authentication failed', 401);
