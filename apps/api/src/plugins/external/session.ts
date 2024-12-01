import fastifySession from '@fastify/session';
import fp from 'fastify-plugin';
import fastifyCookie from '@fastify/cookie';
// import { Auth } from '@/modules/auth/schemas/auth.schema';

declare module 'fastify' {
  interface Session {
    // user: Auth;
  }
}

/**
 * This plugins enables the use of session.
 *
 * @see {@link https://github.com/fastify/session}
 */
export default fp(
  async (app) => {
    app.register(fastifyCookie);

    app.register(fastifySession, {
      secret: app.config.COOKIE_SECRET,
      cookieName: app.config.COOKIE_NAME,
      cookie: {
        secure: app.config.COOKIE_SECURED,
        httpOnly: true,
        maxAge: 1800000,
      },
    });
  },
  {
    name: 'session',
  }
);
