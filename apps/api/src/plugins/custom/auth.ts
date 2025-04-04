import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import jwt from 'jsonwebtoken';
import { User } from '@/modules/user/entities/user.entity';
import { AuthError } from '@/lib/errors';

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: FastifyPluginAsync;
    authenticateApiKey: FastifyPluginAsync;
  }
}

export default fp(
  async (app: FastifyInstance) => {
    // JWT AUthentication
    app.decorate('authenticate', async (request, reply) => {
      try {
        const authHeader = request.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
          throw new AuthError('Auth header is missing or invalid');
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        const user = await app.db.findOne(User, decoded.userId, { fields: ['id', 'email', 'activeWorkspace'] });
        if (!user) {
          throw new AuthError('User not found');
        }
        request.user = user;
      } catch (err) {
        throw new AuthError(err.message);
      }
    });

    // // API Key Authentication
    // app.decorate('authenticateApiKey', async (request, reply) => {
    //   try {
    //     const apiKey = request.headers['x-api-key'];
    //     if (!apiKey) {
    //       throw new AuthError();
    //     }

    //     const key = await app.db.findOne(
    //       ApiKey,
    //       {
    //         key: apiKey,
    //         isActive: true,
    //       },
    //       {
    //         populate: ['user'],
    //       }
    //     );

    //     if (!key) {
    //       throw new AuthError();
    //     }

    //     request.user = key.user;
    //   } catch (err) {
    //     throw new AuthError();
    //   }
    // });
  },
  { name: 'auth' }
);
