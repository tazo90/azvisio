import { createContainer, asClass, asValue, Lifetime, InjectionMode } from 'awilix';
import type { AwilixContainer, BuildResolver } from 'awilix';
import { FastifyInstance } from 'fastify';
import { glob } from 'glob';
import path from 'path';
import { pathToFileURL } from 'url';

type ClassType = { new (...args: any[]): any };

interface AutoloadConfig {
  pattern: string;
  resolverOptions: BuildResolver<any>;
  formatName?: (name: string) => string;
}

function formatFileName(fileName: string, suffix: string): string {
  // Remove extensions
  const nameWithoutExtension = fileName.replace(suffix, '');

  // Replace dash onto camelCasee
  const camelCased = nameWithoutExtension.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());

  // Add suffix as lowercase (e.g. Service, Usecase)
  const capitalizedSuffix = suffix.charAt(1).toUpperCase() + suffix.slice(2);
  return camelCased + capitalizedSuffix;
}

export async function buildContainer(app: FastifyInstance) {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
  });

  // Register basic dependencies
  container.register({
    db: asValue(app.db),
    app: asValue(app),
  });

  // Configure autoloading
  const configs: AutoloadConfig[] = [
    {
      pattern: 'src/modules/**/*.service.ts',
      resolverOptions: { lifetime: Lifetime.SINGLETON },
      formatName: (name) => formatFileName(name, '.service'),
    },
    {
      pattern: 'src/modules/**/*.usecase.ts',
      resolverOptions: { lifetime: Lifetime.SINGLETON },
      formatName: (name) => formatFileName(name, '.usecase'),
    },
  ];

  for (const config of configs) {
    await autoloadComponents(container, config);
  }

  return container;
}

async function autoloadComponents(container: any, config: AutoloadConfig) {
  const files = await glob(config.pattern, { absolute: true });

  for (const file of files) {
    // Convert path onto valid URL, on windows absolute path must starts as file://
    const fileUrl = pathToFileURL(file).href;
    const module = await import(fileUrl);

    const componentName = path.basename(file, '.ts');

    // Find class in module
    const componentClass = findExportedClass(module);
    if (!componentClass) continue;

    const name = config.formatName?.(componentName) ?? componentName;
    container.register(name, asClass(componentClass).setLifetime(Lifetime.SINGLETON));

    console.log(`Registered: ${name}`);
  }
}

function findExportedClass(module: any): ClassType | undefined {
  // Find default export
  if (module.default?.prototype) {
    return module.default;
  }

  // Find named export, which is a class
  return Object.values(module).find((exp): exp is ClassType => typeof exp === 'function' && exp.prototype);
}
