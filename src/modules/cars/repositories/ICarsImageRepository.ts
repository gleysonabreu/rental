import { ICreateCarImage } from '../dtos/ICreateCarImage';
import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImageRepository {
  create({ carId, imageName }: ICreateCarImage): Promise<CarImage>;
}

export { ICarsImageRepository };
