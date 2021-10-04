import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';

const carRouter = Router();
const createCarController = new CreateCarController();

carRouter.post('/', createCarController.handle);

export { carRouter };
