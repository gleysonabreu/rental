import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategories';

const categoriesRouter = Router();

categoriesRouter.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRouter.get('/', (request, response) => {
  return listCategoryController.handle(request, response);
});

const upload = multer({
  dest: './tmp',
});

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRouter };
