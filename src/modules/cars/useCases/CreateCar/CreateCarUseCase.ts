import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  async execute({
    name,
    description,
    dailyRate,
    categoryId,
    fineAmount,
    brand,
    licensePlate,
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByPlate(
      licensePlate,
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists.');
    }

    const car = await this.carsRepository.create({
      name,
      description,
      dailyRate,
      categoryId,
      fineAmount,
      brand,
      licensePlate,
    });

    return car;
  }
}

export { CreateCarUseCase };
