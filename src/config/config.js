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
    dialect: process.env.DIALECT,
  },
  jwt: {
    secretTrafic: process.env.JWT_SECRET_TRAFIC,
    secretVikmoney: process.env.JWT_SECRET_VIKMONEY,
    forgotPasswordSecretTrafic: process.env.JWT_FORGOT_PASSWORD_SECRET_TRAFIC,
    forgotPasswordSecretVikmoney:
      process.env.JWT_FORGOT_PASSWORD_SECRET_VIKMONEY,
    accessExpirationMinutes: 300,
    refreshExpirationDays: 7,
    resetPasswordExpirationMinutes: 30,
    forgotPasswordExpirationMinutes: 30,
    verifyEmailExpirationMinutes: 300,
  },
  login: {
    type: {
      email: "email",
      facebook: "facebook",
      google: "google",
      phoneNumber: "phoneNumber",
    },
  },
  log: {
    traffic: {
      login: "login",
      register: "register",
      logout: "logout",
      forgotPassword: "forgotPassword",
      resetPassword: "resetPassword",
      verifyEmail: "verifyEmail",
      setUpDomain: "setUpDomain",
    },
    vikmoney: {},
  },
  hashRound: 10,
  oauth2: {
    facebookAppId: process.env.FACEBOOK_APP_ID,
    facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
    googleAppId: process.env.GOOGLE_CLIENT_ID,
    googleAppSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  tokenType: {
    access: "access",
    refresh: "refresh",
    verifyEmail: "verifyEmail",
    forgotPassword: "forgotPassword",
  },
  googleRedirectUrl: `${process.env.HOST}/api/v1/users/google/auth/`,
  // googleRedirectUrlV3: `${process.env.HOST}/api/v0/auth/google/callback`,
  googleRedirectUrlV3: process.env.GOOGLE_REDIRECT_URL,
  email: {
    traffic: {
      passMail: process.env.PASS_MAIL,
      from: process.env.EMAIL_FROM,
      urlVerifyEmail: process.env.URL_VERIFY_EMAIL,
      urlForgotPassword: process.env.URL_FORGOT_PASSWORD,
      resetPasswordUrl: process.env.RESET_PASSWORD_URL,
    },
    vikmoney: {
      passMail: process.env.PASS_MAIL,
      from: process.env.EMAIL_FROM,
      urlVerifyEmail: process.env.URL_VERIFY_EMAIL_VIK,
      urlForgotPassword: process.env.URL_FORGOT_PASSWORD_VIK,
      resetPasswordUrl: process.env.RESET_PASSWORD_URL_VIK,
    },
  },
};
