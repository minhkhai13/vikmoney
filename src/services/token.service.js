const moment = require("moment");
const config = require("../config/config");
// const { tokenTypes } = require("../config/tokens");
const jwt = require("jsonwebtoken");
const { active } = require("../validate/auth.validate");

const generateToken = (
  user,
  expires,
  roles = [],
  secret = config.jwt.secret
) => {
  const payload = {
    sub: {
      email: user.email,
      full_name: user.full_name,
      user_name: user.user_name,
      mail_active: user.mail_active,
      role: user.role,
      avatar: user.avatar,
      birthday: user.birthday,
      sex:user.sex,
      phone_number: user.phone_number,
      location: user.location,
      money: user.money,
      infor_detail: user.infor_detail,
    },
    userId: user.id,
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
  console.log(user, "user");
  const accessToken = generateToken(
    user,
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
