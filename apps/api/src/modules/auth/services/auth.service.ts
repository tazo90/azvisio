import { User } from '@/modules/user/user.entity';
import { Database } from '@/types';
import { hash, compare } from 'bcrypt';
// import { sign, verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
// import { sendEmail } from '../utils/email';

export class AuthService {
  constructor(private readonly db: Database) {}

  async register(email: string, password: string) {
    const hashedPassword = await hash(password, 10);
    const confirmationToken = v4();

    const user = this.db.create(User, {
      email,
      password: hashedPassword,
      emailConfirmationToken: confirmationToken,
    });

    await this.db.persistAndFlush(user);
    // await sendEmail(email, 'Confirm your email', `Token: ${confirmationToken}`);

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.db.findOne(User, { email });

    if (!user || !(await compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    user.refreshToken = refreshToken;
    await this.db.flush();

    return { accessToken, refreshToken, user };
  }

  private generateAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
  }

  private generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
  }
}
