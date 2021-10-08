import { inject, injectable } from 'tsyringe';

import { IFindAvailableCarsDTO } from '@modules/cars/dtos/IFindAvailableCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository,
  ) {}
  async execute({
    brand,
    categoryId,
    name,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      brand,
      categoryId,
      name,
    });
    return cars;
  }
}

export { ListAvailableCarsUseCase };
