import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IToken {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not provided', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, auth.secretRefreshToken) as IToken;

    const usersTokensRepository = new UsersTokensRepository();
    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token,
    );

    if (!user) {
      throw new AppError('User does not exists.', 401);
    }

    request.user = {
      id: user.userId,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}

export { ensureAuthenticated };
