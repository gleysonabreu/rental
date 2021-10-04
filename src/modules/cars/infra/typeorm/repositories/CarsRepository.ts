import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    name,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      name,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
    });

    await this.repository.save(car);
    return car;
  }
  async findByPlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({ licensePlate });
    return car;
  }
}

export { CarsRepository };
