import { FastifyInstance } from 'fastify';
import {
  LoginDto,
  LoginSchema,
  RefreshSchema,
  RegisterConfirmDto,
  RegisterConfirmSchema,
  RegisterDto,
  RegisterSchema,
} from './schemas/auth.schema';

const AuthController = async (app: FastifyInstance) => {
  // Login
  app.post('/login', { schema: LoginSchema }, async (request) => {
    const loginUsecase = app.usecase('login');

    const metadata = {
      userAgent: request.headers['user-agent'],
      ip: request.ip,
    };

    return await loginUsecase.execute(request.body as LoginDto, metadata);
  });

  // Register
  app.post('/register', { schema: RegisterSchema }, async (request) => {
    const registerUsecase = app.usecase('register');

    return await registerUsecase.execute(request.body as RegisterDto);
  });

  // Register Confirm
  app.get('/register/confirm/:token', { schema: RegisterConfirmSchema }, async (request) => {
    const registerConfirmUsecase = app.usecase('registerConfirm');

    return await registerConfirmUsecase.execute(request.params as RegisterConfirmDto);
  });

  // Logout
  app.post('/logout', {
    preHandler: [app.authenticate],
    handler: async (request) => {
      const token = request.headers.authorization?.split(' ')[1];
      return app.usecase('logout').execute(token!);
    },
  });

  // Refresh
  app.post('/refresh', { schema: RefreshSchema }, async (request) => {
    const refreshUsecase = app.usecase('refresh');

    return await refreshUsecase.execute(request.body.refreshToken);
  });

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
