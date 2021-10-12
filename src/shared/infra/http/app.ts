import 'reflect-metadata';
import '@shared/container';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';

import swaggerFile from '../../../swagger.json';
import connection from '../typeorm';
import { routes } from './routes';

connection();
const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);
app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: `Internal Server Error: ${error.message}`,
    });
  },
);

export { app };
