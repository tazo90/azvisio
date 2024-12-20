import fastifyStatic, { FastifyStaticOptions } from '@fastify/static';
import { FastifyInstance } from 'fastify';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const autoConfig = (app: FastifyInstance): FastifyStaticOptions => {
  const dirPath = path.join(__dirname, '../../..', app.config.UPLOAD_DIRNAME);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const dirTasksPath = path.join(dirPath, app.config.UPLOAD_TASKS_DIRNAME);
  if (!fs.existsSync(dirTasksPath)) {
    fs.mkdirSync(dirTasksPath);
  }

  return {
    root: path.join(__dirname, '../../..'),
    prefix: `/${app.config.UPLOAD_DIRNAME}`,
  };
};

/**
 * This plugins allows to serve static files as fast as possible.
 *
 * @see {@link https://github.com/fastify/fastify-static}
 */
export default fastifyStatic;
