const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  host: process.env.HOST,
  database: {
    host: process.env.POSTGRES_HOST,
    databaseName: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    minConnection: process.env.MIN_CONNECTION,
    maxConnection: process.env.MAX_CONNECTION,
    enableSqlLogging: process.env.ENABLE_SQL_LOGGING,
  },
  jwt: {
    secret: "envVars.JWT_SECRET",
    forgotPasswordSecret: "process.env.JWT_FORGOT_PASSWORD_SECRET",
    accessExpirationMinutes: 300,
    refreshExpirationDays: 7,
    resetPasswordExpirationMinutes: 30,
    forgotPasswordExpirationMinutes: 30,
    verifyEmailExpirationMinutes: 300,
  },
  hashRound: 10,
  oauth2: {
    facebookAppId: process.env.FACEBOOK_APP_ID,
    facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
    googleAppId: process.env.GOOGLE_CLIENT_ID,
    googleAppSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  tokenType:{
    access: "access",
    refresh: "refresh",
    verifyEmail: "verifyEmail",
    forgotPassword: "forgotPassword",
  },
  googleRedirectUrl: `${process.env.HOST}/api/v1/users/google/auth/`,
  // googleRedirectUrlV3: `${process.env.HOST}/api/v0/auth/google/callback`,
  googleRedirectUrlV3: process.env.GOOGLE_REDIRECT_URL,
  email: {
    passMail: process.env.PASS_MAIL,
    from: process.env.EMAIL_FROM,
    urlVerifyEmail: process.env.URL_VERIFY_EMAIL,
    urlForgotPassword: process.env.URL_FORGOT_PASSWORD,
  },
};
