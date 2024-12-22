import { WorkspaceService } from '@/modules/workspace/workspace.service';
import { Database } from '@/types';
import { CreateUserDto } from '../schemas/user.schema';
import { User } from '../entities/user.entity';

export class UserService {
  constructor(
    private readonly db: Database,
    private readonly workspaceService: WorkspaceService
  ) {}

  // async findTeams(userId: string) {
  //   const user = await this.db.findOneOrFail(User, userId, ['teams']);
  //   return user.teams.getItems();
  // }

  // async findWorkspace(userId: string) {
  //   const user = await this.db.findOneOrFail(User, userId, ['workspace']);
  //   return user.workspace;
  // }

  async findByEmail(email: string) {
    return this.db.findOne(User, { email });
  }

  async findById(id: string) {
    return this.db.findOne(User, { id });
  }
}
