import { UsersInMemoryRepository } from '@modules/accounts/repositories/in-memory/UsersInMemoryRepository';
import { UsersTokensInMemoryRepository } from '@modules/accounts/repositories/in-memory/UsersTokensInMemoryRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/Implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMail } from './SendForgotPasswordMail';

let sendForgotPasswordMailUseCase: SendForgotPasswordMail;
let usersRepository: UsersInMemoryRepository;
let usersTokensRepository: UsersTokensInMemoryRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('SendForgotPasswordMail', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository();
    usersTokensRepository = new UsersTokensInMemoryRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMail(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await usersRepository.create({
      name: 'Herman Olson',
      email: 'te@por.gf',
      password: '1234',
      driverLicense: 'FDCD-1552',
    });

    await sendForgotPasswordMailUseCase.execute('te@por.gf');

    expect(sendMail).toHaveBeenCalled();
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it('should not be able to send email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('giongup@tiv.cz'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create a new user token', async () => {
    const spy = jest.spyOn(usersTokensRepository, 'create');

    await usersRepository.create({
      name: 'Ruby Price',
      email: 'jakitje@paiw.kz',
      password: '1234',
      driverLicense: 'FDUU-1552',
    });

    await sendForgotPasswordMailUseCase.execute('jakitje@paiw.kz');
    expect(spy).toHaveBeenCalled();
  });
});
