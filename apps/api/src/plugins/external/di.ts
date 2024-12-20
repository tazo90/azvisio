import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { createContainer, asClass, asValue, Lifetime, InjectionMode, AwilixContainer } from 'awilix';
import { glob } from 'glob';
import { dirname, join, sep } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface IUsecase {
  execute(...args: any[]): Promise<any>;
}

declare module 'fastify' {
  export interface FastifyInstance {
    container: AwilixContainer;
    usecase(name: string): IUsecase;
    service(name: string): any;
  }
}

function formatFilename(filename: string): string {
  const suffix = filename.includes('.usecase.') ? `.usecase` : `.service`;

  // Remove extensions
  const nameWithoutExtension = filename.replace('.ts', '').replace(suffix, '');

  // Replace dash onto camelCasee
  const camelCased = nameWithoutExtension.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

  // Add suffix as lowercase (e.g. Service, Usecase)
  const capitalizedSuffix = suffix.charAt(1).toUpperCase() + suffix.slice(2);
  return camelCased + capitalizedSuffix;
}

export default fp(
  async (app: FastifyInstance) => {
    const container = await createContainer({
      injectionMode: InjectionMode.CLASSIC,
    });

    // Register basic dependencies
    container.register({
      db: asValue(app.db),
      app: asValue(app),
    });

    // Find all files
    const basePath = join(dirname(__dirname), '..', '..');

    const files = await glob('src/modules/**/*.{service,usecase}.ts', {
      cwd: basePath,
      absolute: true,
    });

    // Load and register each module
    for (const file of files) {
      const fileUrl = pathToFileURL(file).href;
      const module = await import(fileUrl);

      const filename = file.split(sep).pop() || '';
      const className = Object.keys(module).find((key) => typeof module[key] === 'function');

      if (className) {
        const name = formatFilename(filename);

        container.register({
          [name]: asClass(module[className]).setLifetime(Lifetime.SINGLETON),
        });

        console.log(`Registered: ${name}`);
      }
    }

    // console.log('Registered modules:', container.registrations);

    app.decorate('container', container);

    app.decorate('usecase', function <T>(name: string): T {
      return this.container.cradle[`${name}Usecase`];
    });

    app.decorate('service', function <T>(name: string): T {
      return this.container.cradle[`${name}Service`];
    });

    app.log.info('DI Container registered components:', container.registrations);
  },
  { name: 'di' }
);
