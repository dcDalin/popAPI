import { Pool } from 'pg';

const conn = {
  user: process.env.DB_USER || 'dc_dalin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'population',
  password: process.env.DB_PASS || 'Password123!',
  port: 5432,
};

const pool = new Pool(conn);

export { pool, conn };
