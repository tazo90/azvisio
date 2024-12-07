import { Knex, PostgreSqlDriver, SqlEntityManager } from '@mikro-orm/postgresql';

export type Database = SqlEntityManager<PostgreSqlDriver> & {
  knex: Knex;
};

export type RequestMetadata = { userAgent?: string; ip?: string };
