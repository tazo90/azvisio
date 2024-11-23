import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import knex, { Knex } from 'knex';

declare module 'fastify' {
  export interface FastifyInstance {
    knex: Knex;
  }
}

export const autoConfig = (app: FastifyInstance) => {
  return {
    client: 'pg',
    connection: {
      host: app.config.DB_HOST,
      user: app.config.DB_USER,
      password: app.config.DB_PASSWORD,
      database: app.config.DB_NAME,
      port: Number(app.config.DB_PORT),
    },
    pool: { min: 2, max: 10 },
  };
};

export default fp(
  async (app: FastifyInstance, opts) => {
    app.decorate('knex', knex(opts));

    app.addHook('onClose', async (instance) => {
      await instance.knex.destroy();
    });
  },
  { name: 'knex' }
);
