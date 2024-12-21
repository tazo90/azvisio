import { Database } from '@/types';
import { InviteToTeamDto } from '../schemas/team.schema';
import { TeamInvitationService } from '../services/team-invitation.service';
import { TeamService } from '../services/team.service';
import { NotFoundError } from '@/lib/errors';
import { User } from '../../user/entities/user.entity.js';

export class InviteToTeamUseCase {
  constructor(
    private readonly db: Database,
    private readonly teamService: TeamService,
    private readonly teamInvitationService: TeamInvitationService
    // private readonly userService: UserService,
  ) {}

  async execute(inviterId: string, data: InviteToTeamDto): Promise<void> {
    const inviter = await this.db.findOne(User, { id: inviterId });
    if (!inviter) {
      throw new NotFoundError('Inviter not found');
    }

    // Check permissions
    // const canInvite = await this.teamService.canInviteMembers(inviterId, data.teamId);
    // if (!canInvite) {
    //   throw new ForbiddenError('No permission to invite members');
    // }

    const invitedUser = await this.db.findOne(User, { email: data.email });
    if (invitedUser) {
      // User exists - add directly to team
      await this.teamService.addMember(data.teamId, invitedUser.id, data.role);
    } else {
      // Create invitation
      await this.teamInvitationService.createInvitation(data.teamId, data.email, data.role);
    }
  }
}
