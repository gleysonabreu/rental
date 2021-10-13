/* eslint-disable max-classes-per-file */
import dayjs from 'dayjs';

import { CarsInMemoryRepository } from '@modules/cars/repositories/in-memory/CarsInMemoryRepository';
import { RentalsInMemoryRepository } from '@modules/rentals/repositories/in-memory/RentalsInMemoryRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsInMemoryRepository;
let dayjsDateProvider: DayjsDateProvider;
let carsRepository: CarsInMemoryRepository;
describe('CreateRentalUseCase', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepository = new RentalsInMemoryRepository();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepository = new CarsInMemoryRepository();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRepository,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId: '12345',
      carId: '1212',
      expectedReturnDate: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not be able to create new rental if there is another the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '3232',
        carId: '1212',
        expectedReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: '3232',
        carId: '3333',
        expectedReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new rental if there is another the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '3234',
        carId: '4343',
        expectedReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: '3233',
        carId: '4343',
        expectedReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create new rental if invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: '3232',
        carId: '1212',
        expectedReturnDate: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
