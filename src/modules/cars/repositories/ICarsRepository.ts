import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IFindAvailableCarsDTO } from '../dtos/IFindAvailableCarsDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByPlate(licensePlate: string): Promise<Car | undefined>;
  findAvailable(data?: IFindAvailableCarsDTO): Promise<Car[]>;
  findById(carId: string): Promise<Car | undefined>;
}

export { ICarsRepository };
