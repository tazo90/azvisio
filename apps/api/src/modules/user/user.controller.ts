import { FastifyInstance } from 'fastify';
import * as UserSchema from './schemas/user.schema';
import { User } from './entities/user.entity';
import { NotFoundError } from '@/lib/errors';
import { Workspace } from '../workspace/workspace.entity';
import { toResponse } from '@/lib/to-response';

const UserController = async (app: FastifyInstance) => {
  app.addHook('onRequest', app.authenticate);

  // Me
  app.get('/me', async (request) => {
    const user = await app.db.findOne(
      User,
      {
        id: request.user.id,
      },
      { populate: ['activeWorkspace'] }
    );

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return toResponse(UserSchema.UserResponseSchema, user);
  });

  // Update profile
  app.patch('/me', { schema: UserSchema.UpdateUserRequestSchema }, async (request) => {
    const user = await app.db.findOneOrFail(User, request.user.id);

    const body = { ...request.body };

    // Set active workspace
    if (body.workspaceId) {
      const setActiveWorkspaceUsecase = app.usecase('setActiveWorkspace');
      await setActiveWorkspaceUsecase.execute(request.user.id, body.workspaceId);
      delete body.workspaceId;
    }

    app.db.assign(user, request.body);
    app.db.persistAndFlush(user);

    return toResponse(UserSchema.UserResponseSchema, user);
  });
};

export default UserController;
