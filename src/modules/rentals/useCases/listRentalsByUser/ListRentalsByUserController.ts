import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const listRentalsByUser = container.resolve(ListRentalsByUserUseCase);
    const rentals = await listRentalsByUser.execute({ userId });

    return response.json(rentals);
  }
}

export { ListRentalsByUserController };
