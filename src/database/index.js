import { Pool } from 'pg';

const pool = new Pool({
  user: 'dc_dalin',
  host: 'localhost',
  database: 'population',
  password: 'Password123!',
  port: 5432,
});

export default pool;
