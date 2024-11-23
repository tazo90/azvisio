import { FastifyInstance } from 'fastify';
import { LoginBody } from './auth.schema';
import { Type as t } from '@fastify/type-provider-typebox';

// {
//   schema: {
//     body: LoginBody,
//     response: {
//       200: t.Object({
//         success: t.Boolean(),
//         message: t.Optional(t.String()),
//       }),
//       401: t.Object({
//         message: t.String(),
//       }),
//     },
//     tags: ['Auth'],
//   },
// },
// async function (request, reply) {
//   const { username, password } = request.body as LoginBody;

//   return {
//     message: 'Hello' + username,
//   };
// }

const AuthController = async (app: FastifyInstance) => {
  // login
  app.post(
    '/login',
    {
      schema: {
        body: LoginBody,
        response: {
          200: t.Object({
            success: t.Boolean(),
            message: t.Optional(t.String()),
          }),
          401: t.Object({
            message: t.String(),
          }),
        },
        tags: ['Auth'],
      },
    },
    async (request, reply) => {
      const { username, password } = request.body as LoginBody;

      return {
        success: true,
        message: 'Hello' + username,
      };
    }
  );
};

export default AuthController;
