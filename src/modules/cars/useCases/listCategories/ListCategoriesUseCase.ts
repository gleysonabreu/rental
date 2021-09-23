import { inject, injectable } from 'tsyringe';

import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const allCategories = await this.categoryRepository.list();
    return allCategories;
  }
}

export { ListCategoriesUseCase };
