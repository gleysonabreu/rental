import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password, confirm_password: confirmPassword } = request.body;
    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase,
    );
    await resetPasswordUserUseCase.execute({
      token: token as string,
      confirmPassword,
      password,
    });

    return response.send();
  }
}

export { ResetPasswordUserController };
