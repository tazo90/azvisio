import { Collection, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/entities/base.entity.js';
import { User } from '../user/entities/user.entity.js';
import { Team } from '../team/entities/team.entity.js';

@Entity()
export class Workspace extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  description?: string;

  @Property()
  isDefault: boolean = false;

  @ManyToOne(() => User)
  owner!: User;

  @ManyToOne(() => Team, (team) => team.workspace)
  teams = new Collection<Team>(this);
}
