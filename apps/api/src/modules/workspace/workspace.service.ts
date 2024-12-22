import { User } from '@/modules/user/entities/user.entity';
import { Database } from '@/types';
import { Workspace } from './workspace.entity';

export class WorkspaceService {
  constructor(private readonly db: Database) {}

  async createDefaultWorkspace(user: User) {
    await this.db.createFast(Workspace, {
      name: user.email.split('@')[0],
      isDefault: true,
      owner: user,
    });
  }
}
