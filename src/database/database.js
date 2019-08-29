/* eslint-disable no-console */
/* eslint-disable camelcase */
import { pool } from './index';

// self invoking async function
(async () => {
  const dropTables = 'DROP TABLE IF EXISTS county, sub_county, totals_calculated';

  const county = `CREATE TABLE IF NOT EXISTS county (
    county_id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    total_male INTEGER,
    total_female INTEGER,
    total_population INTEGER,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

  const sub_county = `CREATE TABLE IF NOT EXISTS sub_county (
    sub_county_id serial PRIMARY KEY,
    name  VARCHAR(255) NOT NULL UNIQUE,
    male INTEGER NOT NULL,
    female INTEGER NOT NULL,
    total INTEGER NOT NULL,
    county_id_foreign INTEGER REFERENCES county (county_id) ON DELETE CASCADE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  const trigger = `
    CREATE OR REPLACE FUNCTION calculate_total_population() 
    RETURNS trigger AS $calculate_total_population$
    BEGIN
        UPDATE county 
            SET total_male = (SELECT SUM(male)
                            FROM sub_county
                            WHERE NEW.county_id_foreign = county_id),
                total_female = (SELECT SUM(female)
                          FROM sub_county
                          WHERE NEW.county_id_foreign = county_id),
                total_population = (SELECT SUM(total)
                            FROM sub_county
                            WHERE NEW.county_id_foreign = county_id)
            WHERE county_id = NEW.county_id_foreign;

        RETURN NEW;
    END;
    $calculate_total_population$ LANGUAGE plpgsql;

    CREATE TRIGGER totals_calculated
      AFTER INSERT
      ON sub_county
      FOR EACH ROW
      EXECUTE PROCEDURE calculate_total_population();
  `;

  const trigger2 = `
    CREATE OR REPLACE FUNCTION calculate_total_population2() 
    RETURNS trigger AS $calculate_total_population2$
    BEGIN
        UPDATE county 
            SET total_male = (SELECT SUM(male)
                            FROM sub_county
                            WHERE county_id_foreign = county_id),
                total_female = (SELECT SUM(female)
                            FROM sub_county
                            WHERE county_id_foreign = county_id),
                total_population = (SELECT SUM(male)
                            FROM sub_county
                            WHERE county_id_foreign = county_id)
            WHERE county_id = NEW.county_id_foreign;

        RETURN NEW;
    END;
    $calculate_total_population2$ LANGUAGE plpgsql;

    CREATE TRIGGER totals_calculated_two
      AFTER UPDATE OR DELETE
      ON sub_county
      FOR EACH ROW
      EXECUTE PROCEDURE calculate_total_population2();
  `;

  await pool.query(dropTables);
  console.log('Dropping tables');
  await pool.query(county);
  console.log('county created');
  await pool.query(sub_county);
  console.log('sub_county created');
  await pool.query(trigger);
  console.log('trigger created');
  await pool.query(trigger2);
  console.log('trigger2 created');
})();
