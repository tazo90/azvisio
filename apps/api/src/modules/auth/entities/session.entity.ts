import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '@/modules/shared/entities/base.entity';
import { User } from '@/modules/user/user.entity';

@Entity()
export class Session extends BaseEntity {
  @ManyToOne(() => User)
  user!: User;

  @Property()
  token!: string;

  @Property()
  refreshToken!: string;

  @Property()
  userAgent?: string;

  @Property()
  ipAddress?: string;

  @Property()
  lastActivity: Date = new Date();

  @Property()
  expiresAt?: Date;

  @Property({ default: true })
  isActive: boolean = true;
}
