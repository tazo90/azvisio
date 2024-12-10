import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { buildContainer } from '@/container';
import { AwilixContainer } from 'awilix';

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

export default fp(
  async (app: FastifyInstance) => {
    const container = await buildContainer(app);

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
