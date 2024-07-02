import { Types } from 'mongoose';

import { GetUser, CreateUser } from '../../models/user/operations';

import { generateToken } from '../../middlewares/auth';

import throwError from '../../utils/throw-error';
import sendEmail from '../../utils/send-email';
import { emailVerificationTemplate } from '../../utils/email-templates';

/**
* @swagger
* /auth/sign-up:
*   post:
*     summary: Sign Up
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               firstName:
*                 type: string
*                 required: true
*                 description: First Name of User
*                 example: James
*               lastName:
*                 type: string
*                 description: Last Name of User
*                 example: Bond
*               email:
*                 type: string
*                 required: true
*                 description: Email of User
*                 example: james.bond@gmail.com
*               password:
*                 type: string
*                 required: true
*                 description: Password of User
*                 example: james1234
*     tags:
*       - Auth
*     responses:
*       200:
*         description: Sign Up Successfully!
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   description: represent either sign up or not
*                   example: true
*                 message:
*                   type: string
*                   description: response message
*                   example: 'Signup Successfully!'
*       403:
*         description: Email already in use
*       500:
*         description: Some server error
*/

const SignUp = async ({
  firstName,
  lastName,
  email,
  password
}) => {
  let user = await GetUser({ email });
  if (user) throw throwError('Email already in use...', 403);

  const _id = Types.ObjectId().toHexString();
  user = await CreateUser({
    _id,
    firstName,
    lastName,
    email,
    password
  });

  const { token } = generateToken({
    _id,
    email,
    name: firstName
  });

  await sendEmail({
    email,
    subject: 'Account Verification Link!',
    bodyPart: emailVerificationTemplate(firstName, token)
  });

  return {
    message: 'Signup Successfully! A verification mail is sent to your email account.'
  };
};

export default SignUp;
