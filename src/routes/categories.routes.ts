import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();

categoriesRouter.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouter.get('/', (request, response) => {
  return listCategoryController.handle(request, response);
});

export { categoriesRouter };
