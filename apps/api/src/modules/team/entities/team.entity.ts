import { Cascade, Collection, Entity, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../shared/entities/base.entity.js';
import type { Workspace } from '../../workspace/workspace.entity.js';
import type { TeamMember } from './team-member.entity.js';
import type { TeamInvitation } from './team-invitation.entity.js';

@Entity()
@Unique({ properties: ['name', 'workspace'] })
export class Team extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  description?: string;

  @ManyToOne('Workspace', { deleteRule: 'set null' })
  workspace!: Workspace;

  @OneToMany('TeamMember', 'team')
  members = new Collection<TeamMember>(this);

  @OneToMany('TeamInvitation', 'team')
  invitations = new Collection<TeamInvitation>(this);
}
