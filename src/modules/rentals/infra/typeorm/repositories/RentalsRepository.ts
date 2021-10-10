import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      carId,
      expectedReturnDate,
      userId,
    });
    await this.repository.save(rental);
    return rental;
  }
  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({ carId });
    return rental;
  }
  async findOpenRentalByUserId(userId: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({ userId });
    return rental;
  }
}

export { RentalsRepository };