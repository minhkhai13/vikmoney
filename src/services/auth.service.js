const tokenService = require("./token.service");
const googleConfig = require("../config/google");
const config = require("../config/config");
const constant = require("../config/constant");
const _ = require("lodash");
const { google } = require("googleapis");
const userService = require("./users.service");

/**
 * Generate redirect url for Google OAuth
 * @param {string} session
 * @param {String} redirectUrl
 * @returns {Promise}
 */
const generateGoogleAuthenticationUrl = async (session, redirectUrl) => {
  // const scope = ["email", "profile"];
  const scope = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];
  return googleConfig.googleOAuthClient(session).generateAuthUrl({
    access_type: "offline",
    scope,
    state: JSON.stringify({ session, redirectUrl }),
  });
};

/**
 * Callback from Google OAuth
 * @param {string} code
 * @param {string || null} redirectUrl
 * @returns {Promise}
 */
const googleAuthenticationCallBack = async (user, redirectUrl = null) => {
  console.log("user", user);
  if (user) {
    const token = await tokenService.generateAuthTokens(user);

    if (redirectUrl && redirectUrl !== "/") {
      return `http://${config.host}/login?status=login&accessToken=${token.access.token}&refreshToken=${token.refresh.token}&redirectTo=${redirectUrl}&type=google`;
    }
    return `http://${config.host}/login?status=login&accessToken=${token.access.token}&refreshToken=${token.refresh.token}&redirectTo=/login&type=google`;
  }

  return `http://${config.host}/login?status=error&redirectTo=/login&type=google`;
};

exports.generateGoogleAuthenticationUrl = generateGoogleAuthenticationUrl;
exports.googleAuthenticationCallBack = googleAuthenticationCallBack;
