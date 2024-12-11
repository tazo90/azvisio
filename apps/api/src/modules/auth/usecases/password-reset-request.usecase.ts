import { MailService } from '@/modules/mail/mail.service';
import { User } from '@/modules/user/user.entity';
import { Database } from '@/types';

export class PasswordRequestUsecase {
  constructor(
    private readonly db: Database,
    private readonly mailService: MailService
  ) {}

  async execute(email: string) {
    const user = await this.db.findOne(User, { email });

    if (user) {
      const token = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour

      user.passwordResetToken = token;
      user.passwordResetExpiresAt = expiresAt;
      await this.db.flush();

      await this.mailService.queueMail({
        to: user.email,
        subject: 'Reset Your Password',
        template: 'password-reset',
        context: {
          name: user.email,
          resetUrl: `${process.env.APP_URL}/reset-password?token=${token}`,
          expiresIn: 3600,
        },
      });
    }

    // Always return success, to prevent enumeration of emails
    return {
      success: true,
      message: 'If the email exists, reset instructions have been sent',
    };
  }
}
