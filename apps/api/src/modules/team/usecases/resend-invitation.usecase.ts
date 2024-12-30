import { Database } from '@/types';
import { TeamInvitation, TeamInvitationStatusEnum } from '../entities/team-invitation.entity';
import { TeamRoleEnum } from '../entities/team-member.entity';
import { NotFoundError } from '@/lib/errors';

export class ResendInvitationUsecase {
  constructor(private readonly db: Database) {}

  async execute(userId: string, invitationId: string) {
    const invitation = await this.db.findOne(TeamInvitation, {
      id: invitationId,
      status: TeamInvitationStatusEnum.PENDING,
      team: {
        members: {
          user: { id: userId },
          role: TeamRoleEnum.OWNER,
        },
      },
    });

    if (!invitation) {
      throw new NotFoundError('Invitation not found');
    }

    invitation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.db.persistAndFlush(invitation);

    // await this.emailService.sendTeamInvitation(invitation);

    return invitation;
  }
}
