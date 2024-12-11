import { Database } from '@/types';
import { Session } from '../entities/session.entity';
import { sign } from 'jsonwebtoken';

export class RefreshUsecase {
  constructor(private readonly db: Database) {}

  async execute(refreshToken: string) {
    const session = await this.db.findOne(Session, {
      refreshToken,
      isActive: true,
    });

    if (!session) {
      throw new Error('Invalid refresh token');
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      session.isActive = false;
      await this.db.flush();
      throw new Error('Refresh token expired');
    }

    const newToken = sign({ userId: session.user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    session.token = newToken;
    session.lastActivity = new Date();
    await this.db.flush();

    return {
      accessToken: newToken,
      refreshToken: session.refreshToken,
    };
  }
}
