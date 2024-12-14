import path, { dirname } from 'node:path';
import fastifyAutoload from '@fastify/autoload';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fileURLToPath } from 'url';
import { registerPlugins } from './plugins';
import { registerRoutes } from './routes';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function boostrap(app: FastifyInstance, opts: FastifyPluginOptions) {
  delete opts.skipOverride; // This option only serves testing purpose

  await registerPlugins(app);
  await registerRoutes(app);

  // await app.register(fastifyAutoload, {
  //   dir: path.join(__dirname, 'plugins/external'),
  //   options: { ...opts },
  // });

  // app.register(fastifyAutoload, {
  //   dir: path.join(__dirname, 'plugins/custom'),
  //   options: { ...opts },
  // });

  // app.register(fastifyAutoload, {
  //   dir: path.join(__dirname, 'routes'),
  //   autoHooks: true,
  //   cascadeHooks: true,
  //   options: { ...opts },
  // });

  app.setErrorHandler((err, request, reply) => {
    app.log.error(
      {
        err,
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params,
        },
      },
      'Unhandled error occurred'
    );

    reply.code(err.statusCode ?? 500);

    let message = 'Internal Server Error';
    if (err.statusCode && err.statusCode < 500) {
      message = err.message;
    }

    return { message };
  });

  // An attacker could search for valid URLs if your 404 error handling is not rate limited.
  app.setNotFoundHandler(
    {
      preHandler: app.rateLimit({
        max: 3,
        timeWindow: 500,
      }),
    },
    (request, reply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          },
        },
        'Resource not found'
      );

      reply.code(404);

      return { message: 'Not Found' };
    }
  );
}
