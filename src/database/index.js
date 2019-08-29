import { Pool } from 'pg';

const conn = {
  user: 'dc_dalin',
  host: 'localhost',
  database: 'population',
  password: 'Password123!',
  port: 5432,
};

const pool = new Pool(conn);

export { pool, conn };
