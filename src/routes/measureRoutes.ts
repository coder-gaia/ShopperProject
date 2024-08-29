import express from 'express';
const router = express.Router();

import uploadImage from '../controller/UploadController';

router.post('/upload', uploadImage);

export default router;