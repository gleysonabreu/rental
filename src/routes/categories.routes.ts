import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/CreateCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRouter = Router();
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRouter.post('/', createCategoryController.handle);

categoriesRouter.get('/', listCategoryController.handle);

const upload = multer({
  dest: './tmp',
});

categoriesRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRouter };
