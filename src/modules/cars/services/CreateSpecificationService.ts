import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: ICreateSpecificationDTO): void {
    const specification = this.specificationsRepository.findByName(name);
    if (specification) {
      throw new Error('Specification name already exists.');
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
