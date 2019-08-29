import express from 'express';
import subCountyController from '../controllers/subCountyController';

const subCountyRouter = express.Router();

// New Sub County
subCountyRouter.post('/', subCountyController.newCounty);

// View All Sub Counties
subCountyRouter.get('/', subCountyController.allCounties);

// Edit Sub County by ID
subCountyRouter.patch('/:id', subCountyController.editCounty);

// Delete Sub County
subCountyRouter.delete('/:id', subCountyController.deleteCounty);

export default subCountyRouter;
