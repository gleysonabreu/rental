import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensInMemoryRepository implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      expiresDate,
      refreshToken,
      userId,
    });
    this.usersTokens.push(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    return this.usersTokens.find(
      userToken =>
        userToken.userId === userId && userToken.refreshToken === refreshToken,
    );
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(userToken => userToken.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken, 1));
  }
  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    return this.usersTokens.find(
      userToken => userToken.refreshToken === refreshToken,
    );
  }
}

export { UsersTokensInMemoryRepository };
