import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsInMemoryRepository } from '@modules/cars/repositories/in-memory/CarsInMemoryRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: ICarsRepository;

describe('CreateCarUseCase', () => {
  beforeEach(() => {
    carsRepository = new CarsInMemoryRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description Car',
      dailyRate: 100,
      categoryId: 'Category ID',
      fineAmount: 1500,
      brand: 'Brand',
      licensePlate: 'FGF-E52',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car if plate already exists', async () => {
    await createCarUseCase.execute({
      name: 'Car 1',
      description: 'Description Car',
      dailyRate: 100,
      categoryId: 'Category ID',
      fineAmount: 1500,
      brand: 'Brand',
      licensePlate: 'FGF-E52',
    });
    await expect(
      createCarUseCase.execute({
        name: 'Car 2',
        description: 'Description Car',
        dailyRate: 100,
        categoryId: 'Category ID',
        fineAmount: 1500,
        brand: 'Brand',
        licensePlate: 'FGF-E52',
      }),
    ).rejects.toEqual(new AppError('Car already exists.'));
  });

  it('should be able to create a car available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description Car',
      dailyRate: 100,
      categoryId: 'Category ID',
      fineAmount: 1500,
      brand: 'Brand',
      licensePlate: 'FGF-E62',
    });

    expect(car.available).toBeTruthy();
  });
});
