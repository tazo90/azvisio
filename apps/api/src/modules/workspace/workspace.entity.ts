import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/entities/base.entity.js';
import type { User } from '../user/entities/user.entity.js';
import type { Team } from '../team/entities/team.entity.js';

@Entity()
export class Workspace extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  description?: string;

  @Property()
  isDefault: boolean = false;

  @ManyToOne('User')
  owner!: User;

  @OneToMany('Team', 'workspace')
  teams = new Collection<Team>(this);
}
