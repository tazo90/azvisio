import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';

const plugin: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    '/',
    {
      schema: {
        response: {
          200: Type.Object({
            message: Type.String(),
          }),
        },
      },
    },
    async function () {
      return { message: 'Welcome to the official fastify demo!' };
    }
  );
};

export default plugin;
