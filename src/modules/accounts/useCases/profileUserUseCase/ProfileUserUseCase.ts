import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMapper } from '@modules/accounts/mappers/UserMapper';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}
  async execute(userId: string): Promise<IUserResponseDTO> {
    const profile = await this.usersRepository.findById(userId);
    return UserMapper.toDTO(profile);
  }
}

export { ProfileUserUseCase };
