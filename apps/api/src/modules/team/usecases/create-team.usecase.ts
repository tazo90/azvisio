import { Database } from '@/types';
import { TeamMember, TeamRoleEnum } from '../entities/team-member.entity';
import { CreateTeamRequest } from '../schemas/team.schema';
import { Workspace } from '@/modules/workspace/workspace.entity';
import { NotFoundError } from '@/lib/errors';
import { Team } from '../entities/team.entity';

export class CreateTeamUsecase {
  constructor(private readonly db: Database) {}

  async execute(userId: string, data: CreateTeamRequest) {
    const workspace = await this.db.findOne(Workspace, {
      id: data.workspaceId,
      $or: [{ owner: userId }, { teams: { members: { user: userId, role: TeamRoleEnum.OWNER } } }],
    });

    if (!workspace) {
      throw new NotFoundError('Workspace not found or no permission');
    }

    const team = await this.db.createFast(Team, {
      name: data.name,
      workspace,
    });

    const teamMember = await this.db.createFast(TeamMember, {
      team,
      user: { id: userId },
      role: TeamRoleEnum.OWNER,
    });

    return team;
  }
}
