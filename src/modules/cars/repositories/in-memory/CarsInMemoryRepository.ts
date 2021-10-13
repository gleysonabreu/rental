import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAvailableCarsDTO } from '@modules/cars/dtos/IFindAvailableCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsInMemoryRepository implements ICarsRepository {
  private cars: Car[] = [];

  async updateAvailable(carId: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === carId);
    console.log(carId);
    this.cars[findIndex].available = available;
  }

  async findById(carId: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.id === carId);
    return car;
  }

  async findAvailable({
    brand,
    categoryId,
    name,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const cars = this.cars.filter(car => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId === categoryId) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return null;
    });

    return cars;
  }

  async findByPlate(licensePlate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }

  async create({
    name,
    description,
    brand,
    categoryId,
    dailyRate,
    fineAmount,
    licensePlate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      brand,
      categoryId,
      dailyRate,
      fineAmount,
      licensePlate,
      specifications,
      id,
    });

    this.cars.push(car);
    return car;
  }
}

export { CarsInMemoryRepository };
