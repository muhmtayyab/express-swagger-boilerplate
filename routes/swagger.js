import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerDocs, options } from '../config/swagger';

const router = express.Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));
router.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

export default router;
