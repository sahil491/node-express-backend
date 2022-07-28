const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');


const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
dotenv.config({ path: path.join(__dirname, '../../.env') });
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: "jyotipatidar@topsinfosolutions.com",
    pass: "Jjyoti@199",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
// const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
// if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
// }

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: "support@yourapp.com", to, subject, text };
  try{
  await transport.sendMail(msg);
}
catch(error){
  console.log(error)

}
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}`;
  const text = `Dear user, 
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://localhost:3000/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
