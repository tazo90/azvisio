import { Database } from '@/types';
import { TeamService } from './team.service';
import { MailService } from '../../mail/mail.service';
import { TeamRoleEnum } from '../entities/team-member.entity.js';
import { Team } from '../entities/team.entity.js';
import { NotFoundError } from '@/lib/errors';
import { TeamInvitation } from '../entities/team-invitation.entity.js';

export class TeamInvitationService {
  constructor(
    private readonly db: Database,
    private readonly mailService: MailService
  ) {}

  async createInvitation(teamId: string, email: string, role: TeamRoleEnum) {
    const team = await this.db.findOne(Team, { id: teamId });
    if (!team) {
      throw new NotFoundError('Team not found');
    }

    const invitation = this.db.create(TeamInvitation, {
      team,
      email,
      role,
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    await this.db.persistAndFlush(invitation);
    // await this.mailService.sendTeamInvitation(email, team, invitation);

    return invitation;
  }
}
