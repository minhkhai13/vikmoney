const { google } = require('googleapis')
const config = require('./config')

const googleOAuthClient = () => new google.auth.OAuth2(config.oauth2.googleAppId, config.oauth2.googleAppSecret, config.googleRedirectUrlV3)

module.exports = {
  googleOAuthClient
}
