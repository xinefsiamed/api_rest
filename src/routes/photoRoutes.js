import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired'

import PhotoController from '../controllers/PhotoController';

const router = new Router();

router.post('/', loginRequired, PhotoController.store);

export default router;
