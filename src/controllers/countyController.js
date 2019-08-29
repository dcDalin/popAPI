/* eslint-disable consistent-return */
import massive from 'massive';
import { pool, conn } from '../database';

class countyController {
  static newCounty(req, res) {
    const { name } = req.body;
    const zero = 0;
    pool.query(
      'INSERT INTO county (name, total_male, total_female, total_population) VALUES($1, $2, $3, $4)',
      [name, zero, zero, zero],
      (error) => {
        if (error) {
          return res.status(400).json({
            message: 'Error',
            error: error.detail,
          });
        }
        return res.status(201).json({
          message: 'County created',
          data: {
            name,
          },
        });
      },
    );
  }

  static allCounties(req, res) {
    pool.query('SELECT * FROM county ORDER BY county_id ASC', (error, results) => {
      if (error) {
        return res.status(400).json({
          status: '400',
          message: error,
        });
      }

      return res.json({
        message: 'List of all Counties',
        properties: results.rows,
      });
    });
  }

  static singleCounty(req, res) {
    const { id } = req.params;

    pool.query('SELECT * FROM county WHERE county_id = $1', [id], (error, results) => {
      if (results.rowCount < 1) {
        return res.status(404).json({
          message: 'Error',
          error: `County with id ${id} not found`,
        });
      }
      pool.query(
        `select 
          county.county_id as c_id, county.name as c_name,
          sub_county.sub_county_id as sc_id, sub_county.name as sc_name
          from county, sub_county
          where county.county_id = sub_county.county_id_foreign
          and county_id = $1`,
        [id],
        (errr, resss) => {
          if (resss.rowCount < 1) {
            return res.status(200).json({
              message: 'County',
              data: results.rows,
            });
          }
          massive(conn).then((db) => {
            db.query(
              `select 
          county.county_id as c_id, county.name as c_name,
          sub_county.sub_county_id as sc_id, sub_county.name as sc_name
          from county, sub_county
          where county.county_id = sub_county.county_id_foreign`,
              [],
              {
                decompose: {
                  pk: 'c_id',
                  columns: {
                    c_id: 'id',
                    c_name: 'name',
                  },
                  sub_county: {
                    pk: 'sc_id',
                    columns: { sc_id: 'id', sc_name: 'name' },
                    array: true,
                  },
                },
              },
            ).then((output) => res.json({
              message: 'Counties',
              data: output,
            }));
          });
        },
      );
    });
  }

  static editCounty(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    pool.query('SELECT * FROM county WHERE county_id = $1', [id], (error, results) => {
      if (results.rowCount < 1) {
        return res.status(404).json({
          message: 'Error',
          error: `County with id ${id} not found`,
        });
      }
      pool.query('UPDATE county set name = ($1) WHERE county_id = ($2)', [name, id], (err) => {
        if (err) {
          return res.status(400).json({
            message: 'Error',
            error: err,
          });
        }
        return res.status(201).json({
          message: 'County updated',
          data: {
            name,
          },
        });
      });
    });
  }

  static deleteCounty(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM county WHERE county_id = $1', [id], (error, results) => {
      if (results.rowCount > 0) {
        pool.query('DELETE FROM county WHERE county_id = $1', [id], (err) => {
          if (err) {
            return res.status(400).json({
              status: '400',
              message: 'County could not be deleted',
            });
          }
          res.status(201).json({
            status: '201',
            message: 'County deleted',
          });
        });
      } else {
        res.status(404).json({
          message: `County with id ${id} not found`,
        });
      }
    });
  }
}
export default countyController;
