const tokenService = require("./token.traffic.service");
const config = require("../../config/config");
const userService = require("./users.traffic.service");
const ApiError = require("../../utils/apiError");
const emailService = require("./email.traffic.service");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

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

const registerWithMail = async (name, email, password) => {
  try {
    console.log(email, password, name);
    const user = await userService.createUserWithMailPassword(
      name,
      email,
      password
    );
    if (user.errorcode != 200) {
      return user;
    }
    const userInfo = user.data;
    const token = await tokenService.generateAuthTokens(userInfo);
    return ApiError.errorCode200("Register succsess", { token: token });
  } catch (error) {
    console.log(error);
    return ApiError.errorCode310(error);
  }
};
const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return ApiError.errorCode100();
    }
    const islogin = await isPasswordMatch(user, password);
    if (!islogin) {
      return ApiError.errorCode101();
    }
    const token = await tokenService.generateAuthTokens(user);
    if (!token) {
      return ApiError.errorCode401();
    }
    return ApiError.errorCode200("Login success", {
      token,
      status: user.status,
      active: user.active,
    });
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const isPasswordMatch = async (user, password) => {
  try {
    if (!user.password || !password) {
      return false;
    }
    return bcrypt.compare(password, user.password);
  } catch (error) {
    return false;
  }
};

const verifyEmail = async (verifyEmailToken) => {
  try {
    let verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      "verifyEmail"
    );
    if (verifyEmailTokenDoc.errorcode != 200) {
      return verifyEmailTokenDoc;
    }
    let tokenDoc = verifyEmailTokenDoc.tokenDoc;
    const user = await userService.isActiveMail(tokenDoc.user_id);
    if (!user) {
      return ApiError.errorCode204();
    }
    const deleToken = await tokenService.deleteTokenVerifyMail(
      tokenDoc.user_id,
      verifyEmailToken
    );
    if (!deleToken) {
      throw ApiError.errorCode310("Delete token error");
    }
    let dataToken = verifyEmailTokenDoc.payload?.sub;
    dataToken.active = true;
    dataToken.id = dataToken.user_id;
    const token = await tokenService.generateAuthTokens(dataToken);
    return ApiError.errorCode200("Active success", { token: token });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const forgotPasswordMail = async (email) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return ApiError.errorCode204();
    }
    const tokenForgotPassword =
      await tokenService.generateAuthTokensForgotPassword(user);
    if (tokenForgotPassword.errorcode != 200) {
      return tokenForgotPassword;
    }
    const result = await emailService.sendForgotPasswordMail(
      email,
      tokenForgotPassword.tokenForgotPassword
    );
    return result;
  } catch (error) {
    return error;
  }
};

const resetPassword = async (token, password) => {
  try {
    const dataUser = await jwt.verify(
      token,
      config.jwt.forgotPasswordSecretTrafic
    );
    console.log(dataUser, "dataUser");
    if (!dataUser) {
      return ApiError.errorCode204();
    }
    const userId = dataUser.sub?.user_id;
    const userName = dataUser.sub?.user_name;
    if (!userId || !userName) {
      return ApiError.errorCode203();
    }
    const tokenForgotPassword = await tokenService.getTokensVerifyMail(
      token,
      userId,
      config.tokenType.forgotPassword
    );
    console.log(tokenForgotPassword, "tokenForgotPassword");
    if (!tokenForgotPassword) {
      return ApiError.errorCode203();
    }
    const result = await userService.updatePassword(
      tokenForgotPassword.user_id,
      userName,
      password
    );
    if (result.errorcode != 200) {
      return ApiError.errorCode310("Update password error");
    }
    const deleToken = await tokenService.deleteTokenVerifyMail(
      tokenForgotPassword.user_id,
      token,
      config.tokenType.forgotPassword
    );
    if (!deleToken) {
      return ApiError.errorCode310(
        "Update password error. But delete token error "
      );
    }
    return ApiError.errorCode200("Update password success", null);
  } catch (error) {
    console.log(error);
    return ApiError.errorCode310(JSON.stringify(error));
  }
};

const updatePassword = async (oldPassword, newPassword, userInfo) => {
  try {
    const user = await userService.getUserByEmail(userInfo.email);
    console.log(user, "user");
    if (!user) {
      return ApiError.errorCode204();
    }
    const islogin = await isPasswordMatch(user, oldPassword);
    if (!islogin) {
      return ApiError.errorCode101();
    }
    const result = await userService.updatePassword(
      user.id,
      user.user_name,
      newPassword
    );
    if (result.errorcode != 200) {
      return ApiError.errorCode310("Update password error");
    }
    return ApiError.errorCode200("Update password success");
  } catch (error) {
    error = JSON.stringify(error);
    console.log(error);
    return ApiError.errorCode310(error);
  }
};

exports.googleAuthenticationCallBack = googleAuthenticationCallBack;
exports.registerWithMail = registerWithMail;
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
exports.verifyEmail = verifyEmail;
exports.forgotPasswordMail = forgotPasswordMail;
exports.resetPassword = resetPassword;
exports.updatePassword = updatePassword;
