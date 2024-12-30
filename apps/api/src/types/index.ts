import { Knex, PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';

export type Database = SqlEntityManager<PostgreSqlDriver> & {
  knex: Knex;
  createFast: (entityName: any, data: any, options?: any) => Promise<any>;
  createOrFind: (entityName: any, where: any, data: any) => Promise<any>;
  delete: (entityName: any, id: number | string) => Promise<any>;
  save: (entity: any) => Promise<void>;
};

export type RequestMetadata = { userAgent?: string; ip?: string };
