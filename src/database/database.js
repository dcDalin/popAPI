/* eslint-disable no-console */
/* eslint-disable camelcase */
import pool from './index';

// self invoking async function
(async () => {
  const dropTables = 'DROP TABLE IF EXISTS county, sub_county';

  const county = `CREATE TABLE IF NOT EXISTS county (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    totalMale  VARCHAR(255) NOT NULL,
    totalFemale  VARCHAR(255) NOT NULL,
    totalPopulation VARCHAR(255),
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  const sub_county = `CREATE TABLE IF NOT EXISTS sub_county (
    id serial PRIMARY KEY,
    name  VARCHAR(255) NOT NULL UNIQUE,
    male VARCHAR(255) NOT NULL,
    female VARCHAR(255) NOT NULL,
    total VARCHAR(255) NOT NULL,
    countyId INTEGER REFERENCES county (id) ON DELETE CASCADE,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  await pool.query(dropTables);
  console.log('Dropping tables');
  await pool.query(county);
  console.log('users created');
  await pool.query(sub_county);
  console.log('sub_county created');
})();
