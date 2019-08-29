/* eslint-disable consistent-return */
import { pool } from '../database';

class subCountyController {
  static newSubCounty(req, res) {
    const { id } = req.params;
    const { name, male, female } = req.body;
    const total = Number(male) + Number(female);

    pool.query('SELECT * FROM county WHERE county_id = $1', [id], (error, results) => {
      if (results.rowCount > 0) {
        pool.query(
          'INSERT INTO sub_county (name, male, female, total, county_id_foreign) VALUES($1, $2, $3, $4, $5)',
          [name, male, female, total, id],
          (err) => {
            if (err) {
              return res.status(400).json({
                status: '400',
                message: 'Could not create sub-county',
                error: err.detail,
              });
            }
            res.status(201).json({
              status: '201',
              message: 'Sub County Created',
              data: {
                name,
                male,
                female,
                total,
              },
            });
          },
        );
      } else {
        res.status(404).json({
          message: `County with id ${id} not found`,
        });
      }
    });
  }

  static editSubCounty(req, res) {
    const { id } = req.params;
    const { name, male, female } = req.body;
    const total = Number(male) + Number(female);

    pool.query('SELECT * FROM sub_county WHERE sub_county_id = $1', [id], (error, results) => {
      if (results.rowCount < 1) {
        return res.status(404).json({
          message: 'Error',
          error: `Sub County with id ${id} not found`,
        });
      }
      pool.query(
        'UPDATE sub_county set name = ($1), male=($2), female=($3), total=($4) WHERE sub_county_id = ($5)',
        [name, male, female, total, id],
        (err) => {
          if (err) {
            return res.status(400).json({
              message: 'Error',
              error: err,
            });
          }
          return res.status(201).json({
            message: 'Sub County Edited',
            data: {
              name,
              male,
              female,
              total,
            },
          });
        },
      );
    });
  }

  static deleteSubCounty(req, res) {
    const { id } = req.params;

    pool.query('SELECT * FROM sub_county WHERE sub_county_id = $1', [id], (error, results) => {
      if (results.rowCount < 1) {
        return res.status(404).json({
          message: 'Error',
          error: `Sub County with id ${id} not found`,
        });
      }
      pool.query('DELETE FROM sub_county WHERE sub_county_id = ($1)', [id], (err) => {
        if (err) {
          return res.status(400).json({
            message: 'Error',
            error: err,
          });
        }
        return res.status(201).json({
          message: 'Sub County Deleted',
        });
      });
    });
  }

  static allSubCounties(req, res) {
    pool.query('SELECT * FROM sub_county ORDER BY sub_county_id ASC', (error, results) => {
      if (error) {
        return res.status(400).json({
          status: '400',
          message: error,
        });
      }

      return res.json({
        message: 'List of all Sub Counties',
        properties: results.rows,
      });
    });
  }
}
export default subCountyController;
