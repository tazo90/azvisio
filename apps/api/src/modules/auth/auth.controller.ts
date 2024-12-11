import { FastifyInstance } from 'fastify';
import {
  LoginDto,
  LoginSchema,
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
  app.post('/register/confirm', { schema: RegisterConfirmSchema }, async (request) => {
    const registerConfirmUsecase = app.usecase('registerConfirm');

    return await registerConfirmUsecase.execute(request.body as RegisterConfirmDto);
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
