/* eslint-disable no-console */
/* eslint-disable camelcase */
import pool from './index';

// self invoking async function
(async () => {
  const dropTables = 'DROP TABLE IF EXISTS county, sub_county';

  const county = `CREATE TABLE IF NOT EXISTS county (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    total_male INTEGER,
    total_female INTEGER,
    total_population INTEGER,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  const sub_county = `CREATE TABLE IF NOT EXISTS sub_county (
    id serial PRIMARY KEY,
    name  VARCHAR(255) NOT NULL UNIQUE,
    male INTEGER NOT NULL,
    female INTEGER NOT NULL,
    total INTEGER NOT NULL,
    county_id INTEGER REFERENCES county (id) ON DELETE CASCADE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  await pool.query(dropTables);
  console.log('Dropping tables');
  await pool.query(county);
  console.log('county created');
  await pool.query(sub_county);
  console.log('sub_county created');
})();
