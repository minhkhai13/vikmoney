const moment = require("moment");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const db = require("../database/models/index");
const { Json } = require("sequelize/lib/utils");

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
      user_id: user.user_id,
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

const generateAuthTokensVerifyEmail = async (user) => {
  const tokenVerifyMail = await generateToken(
    user,
    moment().add(config.jwt.verifyEmailExpirationMinutes, "minutes"),
    user.roles
  );
  // await saveToken
  const saveToken = await db.Token.create({
    token: tokenVerifyMail,
    user_id: user.user_id,
    // expires: moment().add(config.jwt.verifyEmailExpirationMinutes, "minutes"),
    type: "verifyEmail",
  });

  if(!saveToken){
    return {status: "error", message: "Error"};
  }
  return tokenVerifyMail;
};

const getTokensVerifyMail = async (token,userId) => {
  userId = JSON.stringify(userId);
  return await db.Token.findOne({
    where: { user_id: userId, token: token, type: "verifyEmail" },
    attributes:["id","user_id","token","type"],
    raw: true,
  });
};

const deleteTokenVerifyMail = async (userId, token) => {
  return await db.Token.destroy({
    where: { user_id: userId, token: token, type: "verifyEmail" },
  });
};
const verifyToken = async (token, type) => {
  let payload
  try {
    payload = jwt.verify(token, config.jwt.secret)
  } catch (e) {
    console.log(e, "==================error================ );");
    throw  'Token invalid' + e ;
  }
  console.log(payload, "===========wwwwwwwwwwww==================token");

  const userId = payload.sub?.user_id
  console.log(userId, "=============================userId");
  const tokenDoc = await getTokensVerifyMail(token, userId)
  console.log(tokenDoc, "=============================tokenDoc");
  if (!tokenDoc) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not found')
  }
  return tokenDoc
}


exports.generateAuthTokens = generateAuthTokens;
exports.generateAuthTokensVerifyEmail = generateAuthTokensVerifyEmail;
exports.getTokensVerifyMail = getTokensVerifyMail;
exports.deleteTokenVerifyMail = deleteTokenVerifyMail;
exports.verifyToken = verifyToken;

