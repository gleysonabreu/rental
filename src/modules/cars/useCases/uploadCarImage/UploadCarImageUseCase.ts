import { inject, injectable } from 'tsyringe';

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';

interface IRequest {
  carId: string;
  imageNames: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
  ) {}

  async execute({ carId, imageNames }: IRequest): Promise<void> {
    imageNames.map(async imageName => {
      await this.carsImageRepository.create({ carId, imageName });
    });
  }
}

export { UploadCarImageUseCase };
