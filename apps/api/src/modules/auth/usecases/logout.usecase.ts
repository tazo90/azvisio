import { Database } from '@/types';
import { Session } from '@/modules/auth/entities/session.entity';
import { SessionNotFound } from '@/lib/errors';

export class LogoutUsecase {
  constructor(private readonly db: Database) {}

  async execute(token: string) {
    const session = await this.db.findOne(Session, {
      token,
      isActive: true,
    });

    if (session) {
      session.isActive = false;
      await this.db.flush();

      return { success: true };
    }

    throw new SessionNotFound();
  }
}
