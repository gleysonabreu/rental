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
    const car = await carsRepository.create({
      brand: 'Audi',
      categoryId: 'category_id',
      dailyRate: 12,
      description: 'Audio test',
      fineAmount: 10,
      licensePlate: 'test-4d4d',
      name: 'Audi Gold',
    });

    const rental = await createRentalUseCase.execute({
      userId: '12345',
      carId: car.id,
      expectedReturnDate: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('should not be able to create new rental if there is another the same user', async () => {
    await rentalsRepository.create({
      carId: '2424',
      expectedReturnDate: dayAdd24Hours,
      userId: '3232',
    });

    await expect(
      createRentalUseCase.execute({
        userId: '3232',
        carId: '2323',
        expectedReturnDate: dayAdd24Hours,
      }),
    ).rejects.toEqual(
      new AppError("There's a rental in progressing for user."),
    );
  });

  it('should not be able to create new rental if there is another the same car', async () => {
    await rentalsRepository.create({
      carId: '2525',
      expectedReturnDate: dayAdd24Hours,
      userId: '34343',
    });

    await expect(
      createRentalUseCase.execute({
        userId: '3233',
        carId: '2525',
        expectedReturnDate: dayAdd24Hours,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable!'));
  });

  it('should not be able to create new rental if invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        userId: '3232',
        carId: '5252',
        expectedReturnDate: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
