import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRouter = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

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

rentalRouter.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export { rentalRouter };
