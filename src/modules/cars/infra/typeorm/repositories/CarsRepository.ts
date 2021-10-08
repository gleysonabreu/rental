import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAvailableCarsDTO } from '@modules/cars/dtos/IFindAvailableCarsDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findAvailable({
    brand,
    categoryId,
    name,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }

    if (categoryId) {
      carsQuery.andWhere('category_id = :categoryId', { categoryId });
    }

    const cars = await carsQuery.getMany();
    return cars;
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
