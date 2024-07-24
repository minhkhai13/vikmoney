const moment = require("moment");
const config = require("../config/config");
// const { tokenTypes } = require("../config/tokens");
const jwt = require("jsonwebtoken");

const generateToken = (
  userId,
  expires,
  roles = [],
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    id: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    roles,
  };
  return jwt.sign(payload, secret);
};
const generateAuthTokens = async (user) => {
  const roles = user.roles;

  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    roles,
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(user.id, refreshTokenExpires, roles);
  // await saveToken(
  //   refreshToken,
  //   user.id,
  //   refreshTokenExpires,
  //   tokenTypes.REFRESH
  // );

  return {
    access: {
      token: accessToken,
    },
    refresh: {
      token: refreshToken,
    },
  };
};

exports.generateAuthTokens = generateAuthTokens;
