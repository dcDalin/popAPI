import express from 'express';
import countyController from '../controllers/countyController';

const countyRouter = express.Router();

// New County
countyRouter.post('/', countyController.newCounty);

// View All Counties
countyRouter.get('/', countyController.allCounties);

// View County By Id
countyRouter.get('/:id', countyController.singleCounty);

// Edit County by ID
countyRouter.put('/:id', countyController.editCounty);

// Delete County
countyRouter.delete('/:id', countyController.deleteCounty);

export default countyRouter;
