import { Database, RequestMetadata } from '@/types';
import { SessionService } from '../services/session.service';
import { LoginDto } from '../schemas/auth.schema';
import { User } from '@/modules/user/user.entity';
import { compare } from 'bcrypt';

export class LoginUsecase {
  constructor(
    private readonly db: Database,
    private readonly sessionService: SessionService
  ) {}

  async execute(dto: LoginDto, requestMetadata: RequestMetadata) {
    // Find user
    const user = await this.db.findOne(User, { email: dto.email });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if email is confirmed
    if (!user.isEmailConfirmed) {
      throw new Error('Please confirm your email first');
    }

    // Check password
    const isPasswordValid = await compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create session
    const session = await this.sessionService.createSession(user, requestMetadata);

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      accessToken: session.token,
      refreshToken: session.refreshToken,
    };
  }
}
