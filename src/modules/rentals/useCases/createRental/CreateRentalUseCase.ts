import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider,
  ) {}
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

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDate,
    );

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
