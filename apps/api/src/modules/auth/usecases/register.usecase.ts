import { Database } from '@/types';
import { RegisterDto } from '../schemas/auth.schema';
import { User } from '@/modules/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import { MailService } from '@/modules/mail/mail.service';

export class RegisterUsecase {
  constructor(
    private readonly db: Database,
    private readonly mailService: MailService
  ) {}

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
    // await this.mailService.queueMail({
    //   to: user.email,
    //   subject: 'Welcome',
    //   template: 'welcome',
    //   context: {
    //     name: user.email,
    //     confirmationUrl: `${process.env.APP_URL}/reset-password?token=${confirmationToken}`,
    //     expiresIn: 3600, // 1h
    //   },
    // });

    // Send confirmation email
    await this.mailService.sendWelcomeEmail(user);

    return {
      id: user.id,
      email: user.email,
      message: 'Please check your email to confirm registration',
    };
  }
}
