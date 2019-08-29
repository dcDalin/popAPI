/* eslint-disable consistent-return */
import pool from '../database';

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
    pool.query('SELECT * FROM county ORDER BY id ASC', (error, results) => {
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

    pool.query('SELECT * FROM county WHERE id = $1', [id], (error, results) => {
      if (results.rowCount < 1) {
        return res.status(404).json({
          message: 'Error',
          error: `County with id ${id} not found`,
        });
      }
      res.status(200).json({
        status: '200',
        data: results.rows,
      });
    });
  }

  static editCounty(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    pool.query('SELECT * FROM county WHERE id = $1', [id], (error, results) => {
      if (results.rowCount < 1) {
        return res.status(404).json({
          message: 'Error',
          error: `County with id ${id} not found`,
        });
      }
      pool.query('UPDATE county set name = ($1) WHERE id = ($2)', [name, id], (err) => {
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
    pool.query('SELECT * FROM county WHERE id = $1', [id], (error, results) => {
      if (results.rowCount > 0) {
        pool.query('DELETE FROM county WHERE id = $1', [id], (err) => {
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
