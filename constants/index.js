import { PORT } from '../config/env';

const SWAGGER_SERVERS = [
  {
    url: `http://localhost:${PORT}/api/v1`,
    description: 'Local server'
  }
];

export {
  SWAGGER_SERVERS
};
