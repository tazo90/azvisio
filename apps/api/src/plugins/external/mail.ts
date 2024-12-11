import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { MailService } from '@/modules/mail/mail.service';

declare module 'fastify' {
  export interface FastifyInstance {
    mail: MailService;
  }
}

export default fp(
  async (app: FastifyInstance) => {
    const mailService = new MailService(app);

    // Add hookd to close mail queue
    app.addHook('onClose', async () => {
      if (mailService.mailQueue) {
        await mailService.mailQueue.close();
      }
    });

    app.decorate('mail', mailService);
  },
  { name: 'mail' }
);
