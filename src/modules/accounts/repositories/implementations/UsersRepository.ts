import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../models/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    driverLicense,
    email,
    name,
    password,
    username,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      driverLicense,
      email,
      name,
      password,
      username,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
