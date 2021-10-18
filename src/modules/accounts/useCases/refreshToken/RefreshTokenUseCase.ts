import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

type JWTRefreshToken = {
  sub: string;
  email: string;
};

interface IResponse {
  refreshToken: string;
  token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}
  async execute(token: string): Promise<IResponse> {
    const {
      secretRefreshToken,
      expireInRefreshTokenDays,
      secretToken,
      expireInToken,
    } = auth;

    const { sub: userId, email } = verify(
      token,
      auth.secretRefreshToken,
    ) as JWTRefreshToken;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign(
      {
        email,
      },
      secretRefreshToken,
      {
        subject: userId,
        expiresIn: expireInRefreshTokenDays,
      },
    );

    await this.usersTokensRepository.create({
      expiresDate: this.dateProvider.addDays(expireInRefreshTokenDays),
      refreshToken,
      userId,
    });

    const newToken = sign({}, secretToken, {
      subject: userId,
      expiresIn: expireInToken,
    });

    return { refreshToken, token: newToken };
  }
}

export { RefreshTokenUseCase };
