import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/CreateSpecification/CreateSpecificationController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRouter = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

export { specificationsRouter };
