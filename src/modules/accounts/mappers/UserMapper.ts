import { classToClass } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMapper {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driverLicense,
    avatarURL,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      email,
      name,
      avatar,
      driverLicense,
      avatarURL,
    });
    return user;
  }
}

export { UserMapper };
