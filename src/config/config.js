const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  database: {
    host: process.env.POSTGRES_HOST,
    databaseName: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    minConnection: process.env.MIN_CONNECTION,
    maxConnection: process.env.MAX_CONNECTION,
    enableSqlLogging: process.env.ENABLE_SQL_LOGGING,
  },
  oauth2: {
    facebookAppId: process.env.FACEBOOK_APP_ID,
    facebookAppSecret: process.env.FACEBOOK_APP_SECRET,
    googleAppId: process.env.GOOGLE_APP_ID,
    googleAppSecret: process.env.GOOGLE_APP_SECRET,
  },
  googleRedirectUrl: `${process.env.HOST}/api/v1/users/google/auth/`,
  googleRedirectUrlV3: `${process.env.HOST}/api/v3/auth/google/callback`,
};
