import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUserUseCase/AuthenticateUserController';

const authenticateRouter = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post('/', authenticateUserController.handle);

export { authenticateRouter };
