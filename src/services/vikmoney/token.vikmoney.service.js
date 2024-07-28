const moment = require("moment");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");
const db = require("../../database/models/index");
const ApiError = require("../../utils/apiError");

const generateToken = (
  user,
  expires,
  roles = [],
  secret = config.jwt.secretVikmoney
) => {
  const payload = {
    sub: {
      email: user.email,
      full_name: user.full_name,
      user_name: user.user_name,
      user_id: user.id,
      active: user.active,
      role: user.role,
      avatar: user.avatar,
      birthday: user.birthday,
      sex: user.sex,
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
  // console.log(user, "user");
  const accessToken = generateToken(user, accessTokenExpires, roles);

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(user.id, refreshTokenExpires, roles);
  return {
    access: {
      token: accessToken,
    },
    refresh: {
      token: refreshToken,
    },
  };
};

const generateAuthTokensVerifyEmail = async (user) => {
  user.id = !user.id ? user.user_id : user.id;
  const tokenVerifyMail = generateToken(
    user,
    moment().add(config.jwt.verifyEmailExpirationMinutes, "minutes"),
    user.roles
  );
  // await saveToken
  const saveToken = await db.TokenVikmoney.create({
    token: tokenVerifyMail,
    user_id: user.user_id,
    // expires: moment().add(config.jwt.verifyEmailExpirationMinutes, "minutes"),
    type: "verifyEmail",
  });

  if (!saveToken) {
    return ApiError.errorCode310("Error save token");
  }
  return tokenVerifyMail;
};

const generateAuthTokensForgotPassword = async (user) => {
  try {
    const tokenForgotPassword = generateToken(
      user,
      moment().add(config.jwt.forgotPasswordExpirationMinutes, "minutes"),
      user.roles,
      config.jwt.forgotPasswordSecretVikmoney
    );
    // await saveToken
    const saveToken = await db.TokenVikmoney.create({
      token: tokenForgotPassword,
      user_id: user.id,
      expires: moment()
        .add(config.jwt.forgotPasswordExpirationMinutes, "minutes")
        .toISOString(),
      type: "forgotPassword",
    });

    if (!saveToken) {
      return ApiError.errorCode310("Error save token");
    }
    return { errorcode: 200, tokenForgotPassword };
  } catch (error) {
    return ApiError.errorCode310(error);
  }
};

const getTokensVerifyMail = async (token, userId, type = "verifyEmail") => {
  try {
    userId = JSON.stringify(userId);
    console.log(userId, "userId");
    console.log(token, "token");
    console.log(type, "type");
    return await db.TokenVikmoney.findOne({
      where: { user_id: userId, token: token, type: type },
      attributes: ["id", "user_id", "token", "type"],
      raw: true,
    });
  } catch (error) {
    throw ApiError.errorCode310(error);
  }
};

const deleteTokenVerifyMail = async (userId, token, type = "verifyEmail") => {
  try {
    return await db.TokenVikmoney.destroy({
      where: { user_id: userId, token: token, type: type },
    });
  } catch (error) {
    throw ApiError.errorCode310(error);
  }
};
const verifyToken = async (token, type) => {
  let payload;
  try {
    payload = jwt.verify(token, config.jwt.secretVikmoney);
  } catch (e) {
    return ApiError.errorCode203();
  }
  console.log(payload, "payload");
  const userId = payload.sub?.user_id;
  const tokenDoc = await getTokensVerifyMail(token, userId);
  if (!tokenDoc || !tokenDoc.user_id) {
    throw ApiError.errorCode201();
  }
  return { errorcode: 200, tokenDoc: tokenDoc, payload: payload };
};

exports.generateAuthTokens = generateAuthTokens;
exports.generateAuthTokensVerifyEmail = generateAuthTokensVerifyEmail;
exports.getTokensVerifyMail = getTokensVerifyMail;
exports.deleteTokenVerifyMail = deleteTokenVerifyMail;
exports.verifyToken = verifyToken;
exports.generateAuthTokensForgotPassword = generateAuthTokensForgotPassword;
