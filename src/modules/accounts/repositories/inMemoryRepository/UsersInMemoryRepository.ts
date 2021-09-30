import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/model/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersInMemoryRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, { ...data });
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
}

export { UsersInMemoryRepository };
