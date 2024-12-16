import 'reflect-metadata';

import { defineConfig, Options } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import 'dotenv/config';

const options = {} as Options;

export default defineConfig({
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  implicitTransactions: true,
  pool: { min: 2, max: 10 },
  // debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
  dynamicImportProvider: (id) => import(id),
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  ...options,
});
