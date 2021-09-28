import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute({
    driverLicense,
    email,
    password,
    name,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      driverLicense,
      email,
      password: passwordHash,
      name,
    });
  }
}

export { CreateUserUseCase };
