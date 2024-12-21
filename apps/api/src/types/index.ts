import { Knex, PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';

export type Database = SqlEntityManager<PostgreSqlDriver> & {
  knex: Knex;
  createFast: (entityName: any, data: any, options?: any) => Promise<any>;
};

export type RequestMetadata = { userAgent?: string; ip?: string };
