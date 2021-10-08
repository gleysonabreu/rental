import { CarsInMemoryRepository } from '@modules/cars/repositories/in-memory/CarsInMemoryRepository';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsInMemoryRepository;
describe('ListCarsUseCase', () => {
  beforeEach(() => {
    carsRepository = new CarsInMemoryRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepository.create({
      name: 'Name car',
      description: 'Description Car',
      dailyRate: 100,
      categoryId: 'Category ID',
      fineAmount: 1500,
      brand: 'Brand',
      licensePlate: 'FGF-E52',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
    expect(cars).toHaveLength(1);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepository.create({
      name: 'Name car by name',
      description: 'Description Car',
      dailyRate: 100,
      categoryId: 'Category ID',
      fineAmount: 1500,
      brand: 'Brand',
      licensePlate: 'FGF-E52',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Name car by name',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepository.create({
      name: 'Name car by name',
      description: 'Description Car',
      dailyRate: 100,
      categoryId: 'Category ID',
      fineAmount: 1500,
      brand: 'brand_test',
      licensePlate: 'FGF-E52',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'band_test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category id', async () => {
    const car = await carsRepository.create({
      name: 'Name car by name',
      description: 'Description Car',
      dailyRate: 100,
      categoryId: 'category_id',
      fineAmount: 1500,
      brand: 'brand_test',
      licensePlate: 'FGF-E52',
    });

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: 'category_id',
    });

    expect(cars).toEqual([car]);
  });
});
