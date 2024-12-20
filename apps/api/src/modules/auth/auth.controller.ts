import { FastifyInstance } from 'fastify';
import * as AuthSchema from './schemas/auth.schema';

const AuthController = async (app: FastifyInstance) => {
  // Login
  app.post('/login', { schema: AuthSchema.LoginSchema }, async (request) => {
    const loginUsecase = app.usecase('login');

    const metadata = {
      userAgent: request.headers['user-agent'],
      ip: request.ip,
    };

    return await loginUsecase.execute(request.body as AuthSchema.LoginDto, metadata);
  });

  // Register
  app.post('/register', { schema: AuthSchema.RegisterSchema }, async (request) => {
    const registerUsecase = app.usecase('register');

    return await registerUsecase.execute(request.body as AuthSchema.RegisterDto);
  });

  // Register Confirm
  app.get('/register/confirm/:token', { schema: AuthSchema.RegisterConfirmSchema }, async (request) => {
    const registerConfirmUsecase = app.usecase('registerConfirm');

    return await registerConfirmUsecase.execute(request.params as AuthSchema.RegisterConfirmDto);
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
  app.post('/refresh', { schema: AuthSchema.RefreshSchema }, async (request) => {
    const refreshUsecase = app.usecase('refresh');

    return await refreshUsecase.execute(request.body.refreshToken);
  });

  // Password Reset Request
  app.post('/password/request', { schema: AuthSchema.PasswordResetRequestSchema }, async (request) => {
    const passwordResetRequestUsecase = app.usecase('passwordResetRequest').execute(request.body.refreshToken);

    return await passwordResetRequestUsecase.execute(request.body.refreshToken);
  });

  // Password Reset
  app.post('/password/reset', { schema: AuthSchema.PasswordResetSchema }, async (request) => {
    const passwordResetUsecase = app.usecase('passwordReset');

    return await passwordResetUsecase.execute(request.body);
  });
};

export default AuthController;
