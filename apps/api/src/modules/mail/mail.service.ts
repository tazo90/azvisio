import { Liquid } from 'liquidjs';
import nodemailer from 'nodemailer';
import { FastifyInstance } from 'fastify';
import path from 'path';
import Queue from 'bull';
import 'dotenv/config';

interface MailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

export class MailService {
  private transporter: nodemailer.Transporter;
  private liquid: Liquid;
  private mailQueue: Queue.Queue;

  constructor(private readonly app: FastifyInstance) {
    this.initializeTransporter();
    this.initializeLiquid();
    this.initializeQueue();
  }

  private initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private initializeLiquid() {
    this.liquid = new Liquid({
      root: path.join(__dirname, 'templates'),
      extname: '.liquid',
      cache: process.env.NODE_ENV === 'production',
    });
  }

  private initializeQueue() {
    this.mailQueue = new Queue('email-queue', {
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    });

    this.mailQueue.process(async (job) => {
      try {
        await this.sendMail(job.data);
        this.app.log.info(`Email sent successfully: ${job.id}`);
      } catch (error) {
        this.app.log.error(`Failed to send email: ${error.message}`);
        throw error;
      }
    });

    this.mailQueue.on('failed', (job, error) => {
      this.app.log.error(`Mail job ${job.id} failed: ${error.message}`);
    });
  }

  private async sendMail(options: MailOptions) {
    // Render content
    const html = await this.liquid.renderFile(options.template, {
      ...options.context,
      subject: options.subject,
    });

    const mailOptions = {
      from: process.env.MAIL_FROM || 'noreply@example.com',
      to: options.to,
      subject: options.subject,
      html,
    };

    const info = await this.transporter.sendMail(mailOptions);

    // if (process.env.NODE_ENV === 'development') {
    this.app.log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    // }

    return info;
  }

  async queueMail(options: MailOptions) {
    // return this.mailQueue.add(options);
    return this.sendMail(options);
  }

  async sendWelcomeEmail(user: { email: string; name?: string }) {
    return this.queueMail({
      to: user.email,
      subject: 'Welcome to Our Platform!',
      template: 'welcome',
      context: {
        name: user.name || 'there',
        confirmationUrl: `${process.env.APP_URL}/confirm-account?token=${user.emailConfirmationToken}`,
      },
    });
  }
}
