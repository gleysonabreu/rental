import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRouter = Router();
const createRentalController = new CreateRentalController();

rentalRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createRentalController.handle,
);

export { rentalRouter };
