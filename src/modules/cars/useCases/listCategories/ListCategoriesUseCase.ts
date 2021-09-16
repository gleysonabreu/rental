import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const allCategories = this.categoryRepository.list();
    return allCategories;
  }
}

export { ListCategoriesUseCase };
