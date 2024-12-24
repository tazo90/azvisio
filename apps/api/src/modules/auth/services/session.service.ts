import { Session } from '../entities/session.entity';
import { User } from '../../user/entities/user.entity';
import jwt from 'jsonwebtoken';
import { Database, RequestMetadata } from '@/types';

export class SessionService {
  constructor(private readonly db: Database) {}

  async createSession(user: User, requestMetadata: RequestMetadata): Promise<Session> {
    await this.deactivateOldSessions(user.id);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '3h' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });

    const session = this.db.create(Session, {
      user,
      token,
      refreshToken,
      userAgent: requestMetadata.userAgent,
      ipAddress: requestMetadata.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    await this.db.persistAndFlush(session);
    return session;
  }

  async deactivateSession(sessionId: string): Promise<void> {
    const session = await this.db.findOne(Session, sessionId);
    if (session) {
      session.isActive = false;
      await this.db.flush();
    }
  }

  private async deactivateOldSessions(userId: string): Promise<void> {
    const maxSessions = 5;
    const activeSessions = await this.db.find(
      Session,
      {
        user: userId,
        isActive: true,
      },
      {
        orderBy: { lastActivity: 'DESC' },
      }
    );

    if (activeSessions.length >= maxSessions) {
      const sessionsToDeactivate = activeSessions.slice(maxSessions - 1);
      sessionsToDeactivate.forEach((session) => {
        session.isActive = false;
      });
      await this.db.flush();
    }
  }

  async validateSession(token: string): Promise<Session | null> {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
      const session = await this.db.findOne(Session, {
        token,
        isActive: true,
        expiresAt: { $gt: new Date() },
      });

      if (session) {
        session.lastActivity = new Date();
        await this.db.flush();
      }

      return session;
    } catch {
      return null;
    }
  }

  async refreshSession(refreshToken: string): Promise<Session | null> {
    const session = await this.db.findOne(Session, {
      refreshToken,
      isActive: true,
      expiresAt: { $gt: new Date() },
    });

    if (!session) return null;

    const newToken = jwt.sign({ userId: session.user.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });

    session.token = newToken;
    session.lastActivity = new Date();
    await this.db.flush();

    return session;
  }
}
