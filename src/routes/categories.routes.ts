import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/CreateCategory';

const categoriesRouter = Router();
const categoryRepository = new CategoriesRepository();

categoriesRouter.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouter.get('/', (request, response) => {
  const categories = categoryRepository.list();

  return response.json(categories);
});

export { categoriesRouter };
