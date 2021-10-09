import { ICreateCarImage } from '@modules/cars/dtos/ICreateCarImage';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

import { ICarsImageRepository } from '../ICarsImageRepository';

class CarsImageInMemoryRepository implements ICarsImageRepository {
  private carsImage: CarImage[] = [];

  async create({ carId, imageName }: ICreateCarImage): Promise<CarImage> {
    const carImage = new CarImage();
    Object.assign(carImage, { carId, imageName });
    this.carsImage.push(carImage);

    return carImage;
  }
}

export { CarsImageInMemoryRepository };
