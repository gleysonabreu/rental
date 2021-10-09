import { getRepository, Repository } from 'typeorm';

import { ICreateCarImage } from '@modules/cars/dtos/ICreateCarImage';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';

import { CarImage } from '../entities/CarImage';

class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create({ carId, imageName }: ICreateCarImage): Promise<CarImage> {
    const carImage = this.repository.create({ carId, imageName });
    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImageRepository };
