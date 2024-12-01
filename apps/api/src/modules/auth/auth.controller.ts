import { FastifyInstance } from 'fastify';
import { loginSchema } from './schemas/auth.schema';
import { AuthService } from './services/auth.service';
// import { User } from './entities/session.entity';
// import { LoginBody, LoginSchema } from './auth.schema';

const AuthController = async (app: FastifyInstance) => {
  // @todo: allow to pass orm (entity manager) and db (knex)
  const authService = new AuthService(app.orm);
  // app.post('/login', { schema: LoginSchema }, async (request, reply) => {
  //   const { username, password } = request.body as LoginBody;

  //   return {
  //     success: true,
  //     message: 'Hello' + username,
  //   };
  // });

  // // Register
  // app.post('/register', async (request, reply) => {
  //   const { username, password } = request.body as any;

  //   return {
  //     msg: 'register',
  //   };
  // });

  // // Register Confirm
  // app.post('/register/confirm', async (request, reply) => {
  //   return {
  //     msg: 'register-confirm',
  //   };
  // });

  // Login
  app.post('/login', async (request, reply) => {
    // const users = await app.orm.find(User, {});
    // const result = await app.db('user').select('*');

    const { email, password } = request.body as any;
    const result = await authService.login(email, password);

    return {
      result,
    };
  });

  // // Logout
  // app.post('/logout', async (request, reply) => {
  //   return {
  //     msg: 'logout',
  //   };
  // });

  // // Refresh
  // app.post('/refresh', async (request, reply) => {
  //   return {
  //     msg: 'logout',
  //   };
  // });

  // // Password Request
  // app.post('/password/request', async (request, reply) => {
  //   return {
  //     msg: 'pass request',
  //   };
  // });

  // // Password Reset
  // app.post('/password/reset', async (request, reply) => {
  //   return {
  //     msg: 'pass reset',
  //   };
  // });
};

export default AuthController;
