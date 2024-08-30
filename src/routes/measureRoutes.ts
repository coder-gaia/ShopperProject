import express from 'express';
const router = express.Router();

import uploadImage from '../controller/UploadController';
import { confirmMeasure } from '../controller/ConfirmMeasure';
import listMeasures from '../controller/ListMeasures';

router.post('/upload', uploadImage);
router.patch('/confirm', confirmMeasure);
router.get('/:customer_code/list', listMeasures);


export default router;