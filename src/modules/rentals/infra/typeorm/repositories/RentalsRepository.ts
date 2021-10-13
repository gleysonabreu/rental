import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findByUser(userId: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { id: userId },
      relations: ['car'],
    });
    return rentals;
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async create({
    carId,
    expectedReturnDate,
    userId,
    endDate,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      carId,
      expectedReturnDate,
      userId,
      id,
      endDate,
      total,
    });
    await this.repository.save(rental);
    return rental;
  }
  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: {
        carId,
        endDate: null,
      },
    });
    return rental;
  }
  async findOpenRentalByUserId(userId: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: {
        userId,
        endDate: null,
      },
    });
    return rental;
  }
}

export { RentalsRepository };
