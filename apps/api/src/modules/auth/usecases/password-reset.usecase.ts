import { User } from '@/modules/user/user.entity';
import { Database } from '@/types';
import { hash } from 'bcrypt';
import { Session } from '../entities/session.entity';

export class PasswordResetUsecase {
  constructor(private readonly db: Database) {}

  async execute(params: { token: string; password: string }) {
    const user = await this.db.findOne(User, {
      passwordResetToken: params.token,
    });

    if (!user) {
      throw new Error('Invalid reset token');
    }

    if (!user.passwordResetExpiresAt || user.passwordResetExpiresAt < new Date()) {
      throw new Error('Reset token has expired');
    }

    // Hash new password
    const hashedPassword = await hash(params.password, 10);

    // Update user
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpiresAt = null;

    // Logout all active sessions
    await this.db.nativeUpdate(Session, { user: user.id, isActive: true }, { isActive: false });

    await this.db.flush();

    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }
}
