import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import connect from '../index';

async function createAdmin() {
  const connection = await connect();
  const password = await hash('admin', 8);
  connection.query(
    `INSERT INTO users (id, name, email, password, is_admin, created_at, driver_license)
    VALUES('${uuid()}', 'Admin', 'admin@admin.com', '${password}', true, 'NOW()', 'xxx-xxx')`,
  );

  await connection.close();
}

createAdmin().then(() => console.log('User admin created!'));
