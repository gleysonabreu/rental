import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
describe('CreateCategoryController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash('admin', 8);
    const id = uuid();

    await connection.query(
      `INSERT INTO users (id, name, email, password, is_admin, created_at, driver_license)
      VALUES('${id}', 'Admin', 'admin@admin.com', '${password}', true, 'NOW()', 'xxx-xxx')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const { refreshToken } = (
      await request(app).post('/sessions').send({
        email: 'admin@admin.com',
        password: 'admin',
      })
    ).body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Test',
        description: 'Test category',
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    expect(response.statusCode).toEqual(201);
  });

  it('should not be able to create a new category with name exists', async () => {
    const { refreshToken } = (
      await request(app).post('/sessions').send({
        email: 'admin@admin.com',
        password: 'admin',
      })
    ).body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Test',
        description: 'Test category',
      })
      .set({
        Authorization: `Bearer ${refreshToken}`,
      });

    expect(response.statusCode).toEqual(400);
  });
});
