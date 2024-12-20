import { User } from '@/modules/user/user.entity';
import { Database } from '@/types';
import { hash } from 'bcrypt';
import { Session } from '../entities/session.entity';
import { PasswordResetDto } from '../schemas/auth.schema';

export class PasswordResetUsecase {
  constructor(private readonly db: Database) {}

  async execute(dto: PasswordResetDto) {
    const user = await this.db.findOne(User, {
      passwordResetToken: dto.token,
    });

    if (!user) {
      throw new Error('Invalid reset token');
    }

    if (!user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new Error('Reset token has expired');
    }

    // Hash new password
    const hashedPassword = await hash(dto.password, 10);

    // Update user
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    // Logout all active sessions
    await this.db.nativeUpdate(Session, { user: user.id, isActive: true }, { isActive: false });

    await this.db.flush();

    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }
}
