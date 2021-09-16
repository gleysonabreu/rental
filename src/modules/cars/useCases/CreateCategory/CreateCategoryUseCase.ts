import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  handle({ description, name }: ICreateCategoryDTO): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error('Category name already exists');
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
