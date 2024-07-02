import { GetUser } from '../../models/user/operations';

import { generateToken } from '../../middlewares/auth';

import sendEmail from '../../utils/send-email';
import { resetPasswordTemplate } from '../../utils/email-templates';

/**
* @swagger
* /auth/forgot-password:
*   post:
*     summary: Forgot Password
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 required: true
*                 description: Email of User
*                 example: james.bond@gmail.com
*     tags:
*       - Auth
*     responses:
*       200:
*         description: Reset Link sent to your email account
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   description: represent either request is success or not
*                   example: true
*                 message:
*                   type: string
*                   description: Password Reset link has been sent to your mail.
*       404:
*         description: User not exist
*       500:
*         description: Some server error
*/

const ForgotPassword = async ({ email }) => {
  const user = await GetUser({ email });

  if (user) {
    const {
      _id,
      firstName
    } = user;

    const { token } = generateToken({
      _id,
      email,
      name: firstName
    });

    await sendEmail({
      email,
      subject: 'Reset Password Link!',
      bodyPart: resetPasswordTemplate(
        firstName,
        token
      )
    });

    return {
      message: 'Password Reset link has been sent to your mail.'
    };
  }

  const err = new Error();
  err.error = 'Enter correct or valid email address.';
  err.statusCode = 404;
  throw err;
};

export default ForgotPassword;
