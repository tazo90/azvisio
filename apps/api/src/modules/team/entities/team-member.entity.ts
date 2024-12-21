import { Entity, Enum, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/entities/base.entity.js';
import type { Team } from './team.entity.js';
import type { User } from '../../user/entities/user.entity.js';

export enum TeamRoleEnum {
  MEMBER = 'member',
  OWNER = 'owner',
}

@Entity()
export class TeamMember extends BaseEntity {
  @ManyToOne('Team')
  team!: Team;

  @ManyToOne('User')
  user!: User;

  @Enum(() => TeamRoleEnum)
  role: TeamRoleEnum = TeamRoleEnum.MEMBER;
}
