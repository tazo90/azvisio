import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { MikroORM } from '@mikro-orm/postgresql';
import mikroOrmConfig from '@/config/mikro-orm.config';
import { Database } from '@/types';
import { EntityManager } from '@mikro-orm/core';

declare module 'fastify' {
  export interface FastifyInstance {
    db: Database;
  }
}

export const autoConfig = () => mikroOrmConfig;

function createDb(em: any) {
  const db: Database = Object.assign(em, {
    knex: em.getKnex(),
    createFast: async (entityName: any, data: any, options?: any) => {
      const obj = db.create(entityName, data, options);

      await db.persistAndFlush(obj);

      return obj;
    },
  });

  return db;
}

export default fp(
  async (app: FastifyInstance) => {
    const config = autoConfig();

    // Initialize MikroOrm
    const orm = await MikroORM.init(config);

    // Get entity manager
    const em = orm.em.fork();

    const db = createDb(em);

    app.decorate('db', db);

    app.addHook('onClose', async () => {
      await orm.close();
    });
  },
  { name: 'db' }
);
