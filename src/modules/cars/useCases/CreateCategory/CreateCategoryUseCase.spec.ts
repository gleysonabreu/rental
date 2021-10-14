import { CategoriesInMemoryRepository } from '@modules/cars/repositories/in-memory/CategoriesInMemoryRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesInMemoryRepository: CategoriesInMemoryRepository;

describe('CreateCategoryUseCase', () => {
  beforeEach(() => {
    categoriesInMemoryRepository = new CategoriesInMemoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesInMemoryRepository,
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };
    await createCategoryUseCase.handle({
      ...category,
    });

    const response = await categoriesInMemoryRepository.findByName(
      category.name,
    );
    expect(response).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };
    await createCategoryUseCase.handle({
      ...category,
    });

    await expect(
      createCategoryUseCase.handle({
        ...category,
      }),
    ).rejects.toEqual(new AppError('Category name already exists'));
  });
});
