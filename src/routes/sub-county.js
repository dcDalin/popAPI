import express from 'express';
import subCountyController from '../controllers/subCountyController';

const subCountyRouter = express.Router();

// New Sub County
subCountyRouter.post('/:id', subCountyController.newSubCounty);

// All Sub Counties
subCountyRouter.get('/', subCountyController.allSubCounties);

// Edit Sub County by ID
subCountyRouter.put('/:id', subCountyController.editSubCounty);

// Delete Sub County
subCountyRouter.delete('/:id', subCountyController.deleteSubCounty);

export default subCountyRouter;
