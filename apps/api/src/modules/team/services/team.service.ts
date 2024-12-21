import { Database } from '@/types';
import { WorkspaceService } from '../../workspace/workspace.service';
import { CreateTeamDto } from '../schemas/team.schema';
import { Workspace } from '../../workspace/workspace.entity.js';
import { NotFoundError } from '@/lib/errors';
import { Team } from '../entities/team.entity.js';
import { TeamMember, TeamRoleEnum } from '../entities/team-member.entity.js';
import { User } from '../../user/entities/user.entity.js';

export class TeamService {
  constructor(private readonly db: Database) {}

  async createTeam(dto: CreateTeamDto) {
    const workspace = await this.db.findOne(Workspace, { id: dto.workspaceId });
    if (!workspace) {
      throw new NotFoundError('Workspace not found');
    }

    const team = this.db.create(Team, {
      ...dto,
      workspace,
    });

    await this.db.persistAndFlush(team);
    return team;
  }

  async addMember(teamId: string, userId: string, role: TeamRoleEnum) {
    const [team, user] = await Promise.all([
      this.db.findOne(Team, { id: teamId }),
      this.db.findOne(User, { id: userId }),
    ]);

    if (!team || !user) {
      throw new NotFoundError('Team or user not found');
    }

    const member = this.db.create(TeamMember, {
      team,
      user,
      role,
    });

    await this.db.persistAndFlush(member);
    return member;
  }
}
