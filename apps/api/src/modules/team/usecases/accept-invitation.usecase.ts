import { Database } from '@/types';
import { TeamInvitation, TeamInvitationStatusEnum } from '../entities/team-invitation.entity';
import { NotFoundError } from '@/lib/errors';
import { TeamMember } from '../entities/team-member.entity';
import { User } from '@/modules/user/entities/user.entity';
import { CreateUserRequest } from '@/modules/user/schemas/user.schema';

export class AcceptInvitationUsecase {
  constructor(private readonly db: Database) {}

  async execute(token: string, registrationData: CreateUserRequest) {
    const invitation = await this.db.findOne(TeamInvitation, {
      token,
      status: TeamInvitationStatusEnum.PENDING,
    });

    if (!invitation) {
      throw new NotFoundError('Invitation not found');
    }

    if (invitation.expiresAt < new Date()) {
      invitation.status = TeamInvitationStatusEnum.EXPIRED;
      // @TODO: this.db.save(invitation)
      await this.db.save(invitation);
      throw new NotFoundError('Invitation expired');
    }

    // Create or find user
    const user = await this.db.createOrFind(User, { email: invitation.email }, registrationData);

    // Create team member
    const teamMember = await this.db.createFast(TeamMember, {
      team: invitation.team,
      user,
      role: invitation.role,
    });

    invitation.status = TeamInvitationStatusEnum.ACCEPTED;
    await this.db.save([teamMember, invitation]);

    return invitation.team;
  }
}
