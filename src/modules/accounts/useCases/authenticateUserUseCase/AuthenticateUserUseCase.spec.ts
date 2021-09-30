import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersInMemoryRepository } from '@modules/accounts/repositories/inMemoryRepository/UsersInMemoryRepository';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersInMemoryRepository: UsersInMemoryRepository;
let createUserUseCase: CreateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    createUserUseCase = new CreateUserUseCase(usersInMemoryRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersInMemoryRepository,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'Name test',
      email: 'test@test.com',
      driverLicense: '123456',
      password: '12345',
    };
    await createUserUseCase.execute({
      ...user,
    });

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate a user if email not exists', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'any@any.com',
        password: 'any',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user if password is incorrect', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Name test',
        email: 'test@test.com',
        driverLicense: '123456',
        password: '12345',
      };
      await createUserUseCase.execute({
        ...user,
      });

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'any',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
