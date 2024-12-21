import { Database } from '@/types';
import { User } from '../entities/user.entity.js';
import { ForbiddenError, NotFoundError } from '@/lib/errors.js';
import { Workspace } from '../../workspace/workspace.entity.js';

export class SetActiveWorkspaceUsecase {
  constructor(private readonly db: Database) {}

  async execute(userId: string, workspaceId: string) {
    const user = await this.db.findOne(
      User,
      { id: userId },
      {
        populate: ['teamMembers.team.workspace'],
      }
    );

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Check if user has access to workspace
    if (!user.hasAccessToWorkspace(workspaceId)) {
      throw new ForbiddenError('No access to this workspace');
    }

    const workspace = await this.db.findOne(Workspace, { id: workspaceId });
    if (!workspace) {
      throw new NotFoundError('Workspace not found');
    }

    user.currentWorkspace = workspace;
    await this.db.flush();

    return user;
  }
}
