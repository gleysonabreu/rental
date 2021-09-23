import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async handle({ description, name }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name,
    );
    if (categoryAlreadyExists) {
      throw new Error('Category name already exists');
    }

    await this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
