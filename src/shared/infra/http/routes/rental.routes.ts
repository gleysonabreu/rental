import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRouter = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createRentalController.handle,
);

rentalRouter.post(
  '/devolution/:id',
  ensureAuthenticated,
  ensureAdmin,
  devolutionRentalController.handle,
);

export { rentalRouter };
