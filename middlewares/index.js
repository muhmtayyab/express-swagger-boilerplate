import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import { LocalLoginStrategy, AuthenticationStrategy } from './auth';

const ApplyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(morgan('common'));
  app.use(passport.initialize());
  passport.use(LocalLoginStrategy);
  passport.use(AuthenticationStrategy);
};

export default ApplyMiddlewares;
