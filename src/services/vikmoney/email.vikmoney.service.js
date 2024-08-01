const config = require("../../config/config");
const nodemailer = require("nodemailer");
const ApiError = require("../../utils/apiError");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.email.vikmoney.from,
    pass: config.email.vikmoney.passMail,
  },
});
/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  try {
    const msg = { from: config.email.from, to, subject, text };
    await transporter.sendMail(msg);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.email.urlForgotPassword}/?token=${token}`;
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
  console.log("to, token", to, token);
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${config.email.vikmoney.urlVerifyEmail}?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
  return ApiError.errorCode200("Send email success");
};

const sendForgotPasswordMail = async (to, token) => {
  try {
    const subject = "Forgot password";
    // replace this url with the link to the reset password page of your front-end app
    const resetPasswordUrl = `${config.email.vikmoney.urlForgotPassword}/?token=${token}`;
    const text = `Dear user,
    To reset your password, click on this link: ${resetPasswordUrl}
    If you did not request any password resets, then ignore this email.`;
    await sendEmail(to, subject, text);
    return ApiError.errorCode200("Send email success");
  } catch (error) {
    return ApiError.errorCode310(error);
  }
};

exports.sendEmail = sendEmail;
exports.sendResetPasswordEmail = sendResetPasswordEmail;
exports.sendVerificationEmail = sendVerificationEmail;
exports.sendForgotPasswordMail = sendForgotPasswordMail;
