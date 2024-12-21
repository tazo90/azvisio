import { Entity, Property, Collection, OneToMany, ManyToMany, Enum, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/entities/base.entity.js';
import { Workspace } from '../../workspace/workspace.entity.js';
import { TeamMember } from '../../team/entities/team-member.entity.js';
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

  @ManyToOne(() => Workspace, { nullable: true })
  currentWorkspace?: Workspace;

  @OneToMany(() => Workspace, (workspace) => workspace.owner)
  workspaces = new Collection<Workspace>(this);

  @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
  teamMembers = new Collection<TeamMember>(this);

  hasAccessToWorkspace(workspaceId: string): boolean {
    return this.workspaces.some((workspace) => workspace.id === workspaceId);
  }
}
