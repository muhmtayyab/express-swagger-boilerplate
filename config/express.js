import express from 'express';

import ApplyMiddlewares from '../middlewares';
import router from '../routes';

import { PORT } from './env';

const app = express();
ApplyMiddlewares(app);

app.use('/api/v1', router);

app.listen({ port: PORT }, async () => {
  console.log(`app listening on port ${PORT}!`);
});

export default app;
