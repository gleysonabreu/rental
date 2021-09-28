import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filename: avatarFile } = request.file;
    const { id: userId } = request.user;

    const updateUserUseCase = container.resolve(UpdateUserAvatarUseCase);
    await updateUserUseCase.execute({ avatarFile, userId });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
