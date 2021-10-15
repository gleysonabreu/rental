import { Router } from 'express';

import { authenticateRouter } from './authenticate.routes';
import { carRouter } from './car.routes';
import { categoriesRouter } from './categories.routes';
import { passwordRouter } from './password.routes';
import { rentalRouter } from './rental.routes';
import { specificationsRouter } from './specifications.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/specifications', specificationsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', authenticateRouter);
routes.use('/cars', carRouter);
routes.use('/rentals', rentalRouter);
routes.use('/password', passwordRouter);

export { routes };
