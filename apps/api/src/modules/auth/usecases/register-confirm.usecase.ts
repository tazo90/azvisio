import { Database } from '@/types';
import { RegisterConfirmDto } from '../schemas/auth.schema';
import { User, UserStatusEnum } from '@/modules/user/user.entity';
import { ValidationError } from '@/lib/errors';

export class RegisterConfirmUsecase {
  constructor(private readonly db: Database) {}

  async execute(dto: RegisterConfirmDto) {
    // Find user by token
    const user = await this.db.findOne(User, {
      emailConfirmationToken: dto.token,
    });

    if (!user) {
      throw new ValidationError('Invalid confirmation token');
    }

    if (user.status !== UserStatusEnum.NOT_CONFIRMED) {
      throw new ValidationError('Email already confirmed');
    }

    user.status = UserStatusEnum.ACTIVE;
    user.emailConfirmationToken = null;
    await this.db.flush();

    return {
      message: 'Email confirmed successfully',
    };
  }
}
