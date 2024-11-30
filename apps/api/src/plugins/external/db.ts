import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { Knex } from 'knex';
import { MikroORM, SqlEntityManager } from '@mikro-orm/postgresql';
import mikroOrmConfig from '@/config/mikro-orm.config';

declare module 'fastify' {
  export interface FastifyInstance {
    // db: SqlEntityManager;
    // knex: Knex;
    // orm: MikroORM;
    db: Knex;
    orm: SqlEntityManager;
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

    // Get knex instance from MikroOrm
    const knex = em.getKnex();

    // app.decorate('orm', orm); // full orm
    app.decorate('orm', em); // entity manager
    app.decorate('db', knex); // knex instance

    app.addHook('onClose', async () => {
      await orm.close();
    });
  },
  { name: 'db' }
);
