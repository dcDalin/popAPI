import express from 'express';
import countyController from '../controllers/countyController';

const countyRouter = express.Router();

// New County
countyRouter.post('/', countyController.newCounty);

// View All Counties
countyRouter.get('/', countyController.allCounties);

// Edit County by ID
countyRouter.patch('/:id', countyController.editCounty);

// Delete County
countyRouter.delete('/:id', countyController.deleteCounty);

export default countyRouter;
