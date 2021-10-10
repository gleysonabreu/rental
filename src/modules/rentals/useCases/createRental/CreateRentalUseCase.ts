import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);
class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}
  async execute({
    carId,
    expectedReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumHour = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId,
    );
    if (carUnavailable) {
      throw new AppError('Car is unavailable!');
    }

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUserId(userId);
    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progressing for user.");
    }

    const expectedReturnDateFormat = dayjs(expectedReturnDate)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();
    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, 'hours');

    if (compare < minimumHour) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
