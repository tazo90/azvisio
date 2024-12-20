import createError from '@fastify/error';

export const ValidationError = createError('BAD_REQUEST', '%s', 400);

export const NotFoundError = createError('NOT_FOUND', '%s', 404);

export const AuthError = createError('AUTH_ERROR', '%s', 401);
