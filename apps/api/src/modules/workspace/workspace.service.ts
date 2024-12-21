import { User } from '@/modules/user/entities/user.entity';
import { Database } from '@/types';
import { Workspace } from './workspace.entity';

export class WorkspaceService {
  constructor(private readonly db: Database) {}

  async createUserDefaultWorkspace(user: User) {
    await this.db.create(Workspace, {
      name: user.email.split('@')[0],
      isDefault: true,
      owner: user,
    });
  }
}
