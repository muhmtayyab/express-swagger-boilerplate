import express from 'express';

import {
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp
} from '../controllers/auth';

import { loginCheck, authenticateAuthToken } from '../middlewares/auth';

import catchResponse from '../utils/catch-response';
import throwError from '../utils/throw-error';

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const response = await ForgotPassword({ email });

    res.status(200).json(response);
  } catch (err) {
    catchResponse({
      err,
      res
    });
  }
});

router.post('/reset-password', authenticateAuthToken, async (req, res) => {
  try {
    if (req.error) throwError(req.error, 401);

    const { _id: userId } = req.user;
    const { password } = req.body;

    const response = await ResetPassword({ userId, password });

    res.status(200).json(response);
  } catch (err) {
    catchResponse({
      err,
      res
    });
  }
});

router.post('/sign-in', loginCheck, async (req, res) => {
  try {
    if (req.error) throw throwError(req.error, 401);

    const response = await SignIn({ user: req.user });

    res.status(200).json(response);
  } catch (err) {
    catchResponse({ err, res });
  }
});

router.post('/sign-up', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    if (!firstName || !email || !password) throw throwError('Required Fields are Missing...', 400);

    const response = await SignUp({
      firstName,
      lastName,
      email,
      password
    });

    res.status(200).send(response);
  } catch (err) {
    await catchResponse({ res, err });
  }
});

export default router;
