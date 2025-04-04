import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/entities/base.entity.js';
import type { Team } from './team.entity.js';
import { TeamRoleEnum } from './team-member.entity.js';

export enum TeamInvitationStatusEnum {
  PENDING = 'pending',
  EXPIRED = 'expired',
  ACCEPTED = 'accepted',
}

@Entity()
export class TeamInvitation extends BaseEntity {
  @ManyToOne('Team', { deleteRule: 'cascade' })
  team!: Team;

  @Property()
  email!: string;

  @Enum(() => TeamRoleEnum)
  role: TeamRoleEnum = TeamRoleEnum.MEMBER;

  @Property()
  token!: string;

  @Property()
  expiresAt!: Date;

  @Enum(() => TeamInvitationStatusEnum)
  status: TeamInvitationStatusEnum = TeamInvitationStatusEnum.PENDING;
}
