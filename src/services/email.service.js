import Mailgun from 'mailgun-js'
const config = require('../config/config')

const transport = Mailgun({ apiKey: '5792ffb8813dbd2a5744b3e1075b052b-0f1db83d-046a8257', domain: 'sandboxe5860c3feb4f421f82f6722be7da3fb8.mailgun.org' })

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text }
  await transport.messages().send(msg)
}

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password'
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${config.host}/change-password/${to}/${token}`
  const text = `Dear user,
    To reset your password, click on this link: ${resetPasswordUrl}
    If you did not request any password resets, then ignore this email.`
  await sendEmail(to, subject, text)
}

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification'
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`
  await sendEmail(to, subject, text)
}

exports.transport = transport
exports.sendEmail = sendEmail
exports.sendResetPasswordEmail = sendResetPasswordEmail
exports.sendVerificationEmail = sendVerificationEmail
