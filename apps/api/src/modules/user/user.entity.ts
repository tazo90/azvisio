import { Entity, Property, Collection, OneToMany, ManyToMany, Enum } from '@mikro-orm/core';
import { BaseEntity } from '../shared/entities/base.entity.js';
// import { Workspace } from './workspace.entity';
// import { ApiKey } from './api-key.entity';

export enum UserStatusEnum {
  NOT_CONFIRMED = 'not_confirmed',
  INVITED = 'invited',
  ACTIVE = 'active',
  DISABLED = 'disabled',
  ARCHIVED = 'archived',
}

@Entity()
export class User extends BaseEntity {
  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property({ nullable: true })
  passwordResetToken?: string;

  @Property({ nullable: true })
  passwordResetExpires?: Date;

  @Property({ nullable: true })
  emailConfirmationToken?: string;

  @Property({ nullable: true })
  refreshToken?: string;

  @Enum(() => UserStatusEnum)
  status: UserStatusEnum = UserStatusEnum.NOT_CONFIRMED;

  @Property({ columnType: 'timestamptz', nullable: true })
  last_access?: Date | null = null;

  // @OneToMany(() => Workspace, (workspace) => workspace.owner)
  // workspaces = new Collection<Workspace>(this);

  // @ManyToMany(() => Workspace, (workspace) => workspace.members)
  // memberWorkspaces = new Collection<Workspace>(this);

  // @Property({ nullable: true })
  // currentWorkspaceId?: string;

  // @OneToMany(() => ApiKey, (apiKey) => apiKey.user)
  // apiKeys = new Collection<ApiKey>(this);
}
