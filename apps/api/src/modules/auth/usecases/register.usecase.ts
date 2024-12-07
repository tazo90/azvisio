import { Database } from '@/types';
import { RegisterDto } from '../schemas/auth.schema';
import { User } from '@/modules/user/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

export class RegisterUsecase {
  constructor(private readonly db: Database) {}

  async execute(dto: RegisterDto) {
    // Check if email already taken
    const existingUser = await this.db.findOne(User, { email: dto.email });
    if (existingUser) {
      throw new Error('Email already taken');
    }

    // Hash password
    const hashedPassword = await hash(dto.password, 10);
    const confirmationToken = uuidv4();

    // Create user
    const user = this.db.create(User, {
      email: dto.email,
      password: hashedPassword,
      emailConfirmationToken: confirmationToken,
      isEmailConfirmed: false,
    });

    await this.db.persistAndFlush(user);

    // Send confirmation email

    return {
      id: user.id,
      email: user.email,
      message: 'Please check your email to confirm registration',
    };
  }
}
