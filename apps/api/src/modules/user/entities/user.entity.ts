import { Entity, Property, Collection, OneToMany, Enum, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/entities/base.entity.js';
import type { Workspace } from '../../workspace/workspace.entity.js';
import type { TeamMember } from '../../team/entities/team-member.entity.js';

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

  @ManyToOne('Workspace', { nullable: true })
  activeWorkspace?: Workspace;

  @OneToMany('Workspace', 'owner')
  workspaces = new Collection<Workspace>(this);

  @OneToMany('TeamMember', 'user')
  teams = new Collection<TeamMember>(this);
}
