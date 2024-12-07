import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { MikroORM } from '@mikro-orm/postgresql';
import mikroOrmConfig from '@/config/mikro-orm.config';
import { Database } from '@/types';

declare module 'fastify' {
  export interface FastifyInstance {
    db: Database;
  }
}

export const autoConfig = () => mikroOrmConfig;

export default fp(
  async (app: FastifyInstance) => {
    const config = autoConfig();

    // Initialize MikroOrm
    const orm = await MikroORM.init(config);

    // Get entity manager
    const em = orm.em.fork();

    const db: Database = Object.assign(em, { knex: em.getKnex() });

    app.decorate('db', db);

    app.addHook('onClose', async () => {
      await orm.close();
    });
  },
  { name: 'db' }
);
