import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      expireInToken,
      secretRefreshToken,
      secretToken,
      expireInRefreshToken,
      expireInRefreshTokenDays,
    } = auth;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    if (!(await compare(password, user.password))) {
      throw new AppError('Email or password incorrect!');
    }

    const token = sign({}, secretToken, {
      subject: user.id,
      expiresIn: expireInToken,
    });

    const refreshToken = sign(
      {
        email: user.email,
      },
      secretRefreshToken,
      {
        subject: user.id,
        expiresIn: expireInRefreshToken,
      },
    );

    await this.usersTokensRepository.create({
      userId: user.id,
      expiresDate: this.dateProvider.addDays(expireInRefreshTokenDays),
      refreshToken,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };
