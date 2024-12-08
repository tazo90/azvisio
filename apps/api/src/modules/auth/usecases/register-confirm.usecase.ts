import { Database } from '@/types';
import { RegisterConfirmDto } from '../schemas/auth.schema';
import { User } from '@/modules/user/user.entity';

export class RegisterConfirmUsecase {
  constructor(private readonly db: Database) {}

  async execute(dto: RegisterConfirmDto) {
    // Find user by token
    const user = await this.db.findOne(User, {
      emailConfirmationToken: dto.token,
    });

    if (!user) {
      throw new Error('Invalid confirmation token');
    }

    if (user.isEmailConfirmed) {
      throw new Error('Email already confirmed');
    }

    user.isEmailConfirmed = true;
    user.emailConfirmationToken = null;
    await this.db.flush();

    return {
      message: 'Email confirmed successfully',
    };
  }
}
