import fp from 'fastify-plugin';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';

export default fp(async function (app) {
  await app.register(fastifySwagger, {
    hideUntagged: true,
    openapi: {
      info: {
        title: 'Fastify demo API',
        description: 'The official Fastify demo API',
        version: '0.0.0',
      },
    },
  });

  // Disable swagger docs
  // await app.register(fastifySwaggerUi, {
  //   routePrefix: '/swagger',
  // });

  await app.register(ScalarApiReference, {
    routePrefix: '/docs',
  });
});
