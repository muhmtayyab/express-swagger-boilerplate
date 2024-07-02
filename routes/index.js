import express from 'express';

import auth from './auth';
import swagger from './swagger';

const router = express.Router();

router.use('/auth', auth);
router.use('/swagger', swagger);

export default router;
