import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/model/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesInMemoryRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { name, description });
    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    const { categories } = this;
    return categories;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}

export { CategoriesInMemoryRepository };
