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
    const userAlreadyExits = await this.usersRepository.findByEmail(email);
    if (userAlreadyExits) {
      throw new Error('User already exists');
    }

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
