import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(carId: string): Promise<Rental | undefined>;
  findOpenRentalByUserId(userId: string): Promise<Rental | undefined>;
}

export { IRentalsRepository };