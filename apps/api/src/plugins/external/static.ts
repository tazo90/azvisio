import fastifyStatic, { FastifyStaticOptions } from '@fastify/static';
import { FastifyInstance } from 'fastify';
import fs from 'fs';
import path from 'path';

export const autoConfig = (app: FastifyInstance): FastifyStaticOptions => {
  const dirPath = path.join(import.meta.dirname, '../../..', app.config.UPLOAD_DIRNAME);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const dirTasksPath = path.join(dirPath, app.config.UPLOAD_TASKS_DIRNAME);
  if (!fs.existsSync(dirTasksPath)) {
    fs.mkdirSync(dirTasksPath);
  }

  return {
    root: path.join(import.meta.dirname, '../../..'),
    prefix: `/${app.config.UPLOAD_DIRNAME}`,
  };
};

/**
 * This plugins allows to serve static files as fast as possible.
 *
 * @see {@link https://github.com/fastify/fastify-static}
 */
export default fastifyStatic;
