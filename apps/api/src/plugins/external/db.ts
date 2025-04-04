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

function createDb(em: any) {
  const db: Database = Object.assign(em, {
    knex: em.getKnex(),
    createFast: async (entityName: any, data: any, options?: any) => {
      const obj = db.create(entityName, data, options);

      await db.persistAndFlush(obj);

      return obj;
    },
    createOrFind: async (entityName: any, where: any, data: any) => {
      const obj = await db.findOne(entityName, where);

      if (obj) {
        return obj;
      }

      return db.createFast(entityName, data);
    },
    delete: async (entityName: any, id: number | string) => {
      try {
        const obj = db.getReference(entityName, id);

        await db.removeAndFlush(obj);
      } catch {
        return { success: false };
      }
      return { success: true };
    },
    save: async (entity: any) => {
      await db.persistAndFlush(entity);
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
