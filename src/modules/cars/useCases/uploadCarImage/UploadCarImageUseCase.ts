import { inject, injectable } from 'tsyringe';

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  carId: string;
  imageNames: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ carId, imageNames }: IRequest): Promise<void> {
    imageNames.map(async imageName => {
      await this.carsImageRepository.create({ carId, imageName });
      await this.storageProvider.save(imageName, 'cars');
    });
  }
}

export { UploadCarImageUseCase };
