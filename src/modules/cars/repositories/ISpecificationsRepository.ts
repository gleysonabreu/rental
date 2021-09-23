import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../model/Specification';

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification | undefined>;
}

export { ISpecificationsRepository };
