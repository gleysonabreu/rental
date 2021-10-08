import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: carId } = request.params;
    const { specifications_id: specificationsId } = request.body;
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const specificationsCars = await createCarSpecificationUseCase.execute({
      carId,
      specificationsId,
    });

    return response.json(specificationsCars);
  }
}

export { CreateCarSpecificationController };
