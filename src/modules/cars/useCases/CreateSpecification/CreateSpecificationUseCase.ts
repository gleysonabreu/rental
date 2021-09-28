import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = await this.specificationsRepository.findByName(name);
    if (specification) {
      throw new AppError('Specification name already exists.');
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
