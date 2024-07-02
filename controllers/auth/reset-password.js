import { GetUser } from '../../models/user/operations';

/**
* @swagger
* /auth/reset-password:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Reset Password
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               password:
*                 type: string
*                 required: true
*                 description: Password of User
*                 example: james123
*     tags:
*       - Auth
*     responses:
*       200:
*         description: Password Updated Successfully
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
*                   description: Password Updated Successfully
*       401:
*         description: Unauthorized
*       500:
*         description: Some server error
*/

const ResetPassword = async ({
  userId,
  password
}) => {
  const user = await GetUser({ _id: userId });

  user.password = password;
  await user.save();

  return {
    message: 'Password Updated Successfully!'
  };
};

export default ResetPassword;
