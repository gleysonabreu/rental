import { CarsInMemoryRepository } from '@modules/cars/repositories/in-memory/CarsInMemoryRepository';
import { SpecificationInMemoryRepository } from '@modules/cars/repositories/in-memory/SpecificationInMemoryRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecification: CreateCarSpecificationUseCase;
let carsRepository: CarsInMemoryRepository;
let specificationsRepository: SpecificationInMemoryRepository;

describe('CreateCarSpecificationUseCase', () => {
  beforeEach(() => {
    carsRepository = new CarsInMemoryRepository();
    specificationsRepository = new SpecificationInMemoryRepository();
    createCarSpecification = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository,
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      name: 'Name car',
      description: 'Description Car',
      dailyRate: 100,
      categoryId: 'Category ID',
      fineAmount: 1500,
      brand: 'Brand',
      licensePlate: 'FGF-E52',
    });

    const specification = await specificationsRepository.create({
      description: 'Test',
      name: 'testing',
    });
    const specificationsId = [specification.id];

    const response = await createCarSpecification.execute({
      carId: car.id,
      specificationsId,
    });

    expect(response).toHaveProperty('specifications');
    expect(response.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      await createCarSpecification.execute({
        carId: 'id_off',
        specificationsId: ['test'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
