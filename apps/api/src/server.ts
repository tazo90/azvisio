import Fastify from 'fastify';
import fp from 'fastify-plugin';

import closeWithGrace from 'close-with-grace';
import boostrap from './app';

function getLoggerOptions() {
  // Only if the program is running in an interactive terminal
  if (process.stdout.isTTY) {
    return {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    };
  }

  return { level: process.env.LOG_LEVEL ?? 'silent' };
}

const app = Fastify({
  logger: getLoggerOptions(),
  ajv: {
    customOptions: {
      coerceTypes: 'array', // change type of data to match type keyword
      removeAdditional: 'all', // Remove additional body properties
    },
  },
});

async function init() {
  app.register(fp(boostrap));

  closeWithGrace({ delay: parseInt(process.env.FASTIFY_CLOSE_GRACE_DELAY!) ?? 500 }, async ({ err }) => {
    if (err != null) {
      app.log.error(err);
    }

    await app.close();
  });

  await app.ready();

  try {
    await app.listen({ port: parseInt(process.env.PORT!) ?? 4000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

init();
