import { Database } from '@/types';
import { User } from '../entities/user.entity.js';
import { ForbiddenError, NotFoundError } from '@/lib/errors.js';
import { Workspace } from '../../workspace/workspace.entity.js';

export class SetActiveWorkspaceUsecase {
  constructor(private readonly db: Database) {}

  async execute(userId: string, workspaceId: string) {
    const user = await this.db.findOne(User, { id: userId });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const workspace = await this.db.findOne(Workspace, { id: workspaceId });
    if (!workspace) {
      throw new NotFoundError('Workspace not found');
    }

    // Check if user is owner of workspace
    const hasAccess = await this.db.findOne(Workspace, {
      id: workspaceId,
      $or: [{ owner: user }, { teams: { members: { user } } }],
    });

    if (!hasAccess) {
      throw new ForbiddenError('No access to this workspace');
    }

    // Set active workspace
    user.activeWorkspace = workspace;
    await this.db.flush();

    return user;
  }
}
