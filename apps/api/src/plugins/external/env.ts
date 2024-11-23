import env from '@fastify/env';

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: number;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      COOKIE_SECRET: string;
      COOKIE_NAME: string;
      COOKIE_SECURED: boolean;
      RATE_LIMIT_MAX: number;
      UPLOAD_DIRNAME: string;
      UPLOAD_TASKS_DIRNAME: string;
    };
  }
}

const schema = {
  type: 'object',
  required: [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'COOKIE_SECRET',
    'COOKIE_NAME',
    'COOKIE_SECURED',
  ],
  properties: {
    // Database
    DB_HOST: {
      type: 'string',
      default: 'localhost',
    },
    DB_PORT: {
      type: 'number',
      default: 3306,
    },
    DB_USER: {
      type: 'string',
    },
    DB_PASSWORD: {
      type: 'string',
    },
    DB_NAME: {
      type: 'string',
    },

    // Security
    COOKIE_SECRET: {
      type: 'string',
    },
    COOKIE_NAME: {
      type: 'string',
    },
    COOKIE_SECURED: {
      type: 'boolean',
      default: true,
    },
    RATE_LIMIT_MAX: {
      type: 'number',
      default: 100, // Put it to 4 in your .env file for tests
    },

    // Files
    UPLOAD_DIRNAME: {
      type: 'string',
      default: 'uploads',
    },
    UPLOAD_TASKS_DIRNAME: {
      type: 'string',
      default: 'tasks',
    },
  },
};

export const autoConfig = {
  // Decorate Fastify instance with `config` key
  // Optional, default: 'config'
  confKey: 'config',

  // Schema to validate
  schema,

  // Needed to read .env in root folder
  dotenv: true,
  // or, pass config options available on dotenv module
  // dotenv: {
  //   path: `${import.meta.dirname}/.env`,
  //   debug: true
  // }

  // Source for the configuration data
  // Optional, default: process.env
  data: process.env,
};

/**
 * This plugins helps to check environment variables.
 *
 * @see {@link https://github.com/fastify/fastify-env}
 */
export default env;
