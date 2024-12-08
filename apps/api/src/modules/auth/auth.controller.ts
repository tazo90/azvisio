import { FastifyInstance } from 'fastify';
import {
  LoginDto,
  LoginSchema,
  RegisterConfirmDto,
  RegisterConfirmSchema,
  RegisterDto,
  RegisterSchema,
} from './schemas/auth.schema';
import { LoginUsecase } from './usecases/login.usecase';
import { SessionService } from './services/session.service';
import { RegisterUsecase } from './usecases/register.usecase';
import { RegisterConfirmUsecase } from './usecases/register-confirm.usecase';

const AuthController = async (app: FastifyInstance) => {
  const sessionService = new SessionService(app.db);

  // Login
  app.post('/login', { schema: LoginSchema }, async (request) => {
    const usecase = new LoginUsecase(app.db, sessionService);

    const metadata = {
      userAgent: request.headers['user-agent'],
      ip: request.ip,
    };

    return await usecase.execute(request.body as LoginDto, metadata);
  });

  // Register
  app.post('/register', { schema: RegisterSchema }, async (request) => {
    const usecase = new RegisterUsecase(app.db);
    return await usecase.execute(request.body as RegisterDto);
  });

  // Register Confirm
  app.post('/register/confirm', { schema: RegisterConfirmSchema }, async (request) => {
    const usecase = new RegisterConfirmUsecase(app.db);
    return await usecase.execute(request.body as RegisterConfirmDto);
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
