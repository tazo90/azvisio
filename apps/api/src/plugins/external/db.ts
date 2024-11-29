import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { Knex } from 'knex';
import { MikroORM, SqlEntityManager } from '@mikro-orm/postgresql';
import mikroOrmConfig from '@/config/mikro-orm.config';

declare module 'fastify' {
  export interface FastifyInstance {
    db: SqlEntityManager;
    knex: Knex;
    orm: MikroORM;
  }
}

export const autoConfig = () => mikroOrmConfig;

export default fp(
  async (app: FastifyInstance) => {
    const config = autoConfig(app);

    // Initialize MikroOrm
    const orm = await MikroORM.init(config);

    // Get knex instance from MikroOrm
    const knex = (orm.em as SqlEntityManager).getKnex();

    app.decorate('orm', orm); // full orm
    app.decorate('db', orm.em as SqlEntityManager); // entity manager
    app.decorate('knex', knex); // knex instance

    app.addHook('onClose', async () => {
      await orm.close();
    });
  },
  { name: 'db' }
);
