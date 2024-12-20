import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/entities/base.entity.js';
import { Workspace } from '../../workspace/workspace.entity.js';
import { TeamMember } from './team-member.entity.js';
import { TeamInvitation } from './team-invitation.entity.js';

@Entity()
export class Team extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  description?: string;

  @ManyToOne(() => Workspace)
  workspace!: Workspace;

  @OneToMany(() => TeamMember, (member) => member.team)
  members = new Collection<TeamMember>(this);

  @OneToMany(() => TeamInvitation, (invitation) => invitation.team)
  invitations = new Collection<TeamInvitation>(this);
}
