import { Database } from '@/types';
import { InviteToTeamRequest } from '../schemas/team.schema';
import { NotFoundError, ValidationError } from '@/lib/errors';
import { MailService } from '@/modules/mail/mail.service';
import { TeamMember, TeamRoleEnum } from '../entities/team-member.entity';
import { Team } from '../entities/team.entity';
import { TeamInvitation, TeamInvitationStatusEnum } from '../entities/team-invitation.entity';

export class InviteToTeamUseCase {
  constructor(
    private readonly db: Database,
    private readonly mailService: MailService
  ) {}

  async execute(inviterId: string, data: InviteToTeamRequest): Promise<void> {
    const team = await this.db.findOne(Team, {
      id: data.teamId,
      members: {
        user: { id: inviterId },
        role: TeamRoleEnum.OWNER,
      },
    });

    if (!team) {
      throw new NotFoundError('Team not found or no permission');
    }

    // Check if user is member of the team
    const existingMember = await this.db.findOne(TeamMember, {
      team: { id: data.teamId },
      user: { email: data.email },
    });

    if (existingMember) {
      throw new NotFoundError('User is already a team member');
    }

    // Check if exists active invitation
    const existingInvitation = await this.db.findOne(TeamInvitation, {
      team: { id: data.teamId },
      email: data.email,
      status: TeamInvitationStatusEnum.PENDING,
    });

    if (existingInvitation) {
      throw new ValidationError('Invitation already exists');
    }

    const token = crypto.randomUUID()

    const invitation = await this.db.createFast(TeamInvitation, {
      team,
      email: data.email,
      role: data.role,
      token,,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 1000),
    });

    // Send invite to team email
    await this.mailService.queueMail({
      to: data.email,
      subject: 'Invitation to join',
      template: 'intite-to-team',
      context: {
        name: data.email,
        confirmationUrl: `${process.env.APP_URL}/invitation?token=${token}`,
        expiresIn: 3600, // 1h
      },
    });

    return invitation;
  }
}
