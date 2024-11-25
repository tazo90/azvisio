import { FastifyInstance } from 'fastify';
import { LoginBody, LoginSchema } from './auth.schema';

const AuthController = async (app: FastifyInstance) => {
  app.post('/login', { schema: LoginSchema }, async (request, reply) => {
    const { username, password } = request.body as LoginBody;

    return {
      success: true,
      message: 'Hello' + username,
    };
  });
};

export default AuthController;
