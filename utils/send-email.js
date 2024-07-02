import nodemailer from 'nodemailer';

import {
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_HOST,
  MAIL_PORT
} from '../config/env';

const sendEmail = async ({ email, subject, attachments, bodyPart }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      secureConnection: false,
      port: MAIL_PORT,
      requiresAuth: true,
      auth: {
        user: MAIL_USERNAME, // generated ethereal user
        pass: MAIL_PASSWORD// generated ethereal password
      }
      // debug: true,
      // logger: true,
    });

    await transporter.sendMail({
      from: MAIL_USERNAME, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      attachments: attachments, // file attachment
      html: bodyPart
    });
  } catch (error) {
    console.log('🚀 ~ sendEmail ~ error:', error);
  }
};

export default sendEmail;
