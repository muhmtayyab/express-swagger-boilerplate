import { generateToken } from '../../middlewares/auth';

/**
* @swagger
* /auth/sign-in:
*   post:
*     summary: Sign In
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
*               password:
*                 type: string
*                 required: true
*                 description: Password of User
*                 example: james1234
*     tags:
*       - Auth
*     responses:
*       200:
*         description: Sign In Successfully!
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   description: represent either sign in or not
*                   example: true
*                 user:
*                   type: object
*                   description: user details
*                   example: { _id: 1, email: 'jame.bond@gmail.com' }
*                 token:
*                   type: string
*                   description: auth token
*                   example: 'eyJhbGciOiJIUzI1...'
*       500:
*         description: Some server error
*/

const SignIn = async ({ user }) => {
  const {
    _id,
    email,
    firstName: name
  } = user;

  const { token } = generateToken({
    _id,
    email,
    name
  });

  return {
    user,
    token
  };
};

export default SignIn;
