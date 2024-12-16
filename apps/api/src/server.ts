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

export const app = Fastify({
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

  // Graceful shutdown tylko w produkcji
  if (process.env.PROD) {
    closeWithGrace({ delay: parseInt(process.env.FASTIFY_CLOSE_GRACE_DELAY!) ?? 500 }, async ({ err }) => {
      if (err != null) {
        app.log.error(err);
      }
      await app.close();
    });
  }

  await app.ready();

  // Uruchamiamy serwer zawsze, nie tylko w produkcji
  try {
    const port = parseInt(process.env.PORT!) ?? 4000;
    await app.listen({
      port,
      host: '0.0.0.0', // lub 'localhost' jeśli chcesz tylko lokalnie
    });

    if (import.meta.hot) {
      import.meta.hot.on('vite:beforeFullReload', () => {
        app.close();
      });

      import.meta.hot.dispose(() => {
        app.close();
      });
    }

    app.log.info(`Server is running on http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Zawsze uruchamiamy init()
init().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default app;
