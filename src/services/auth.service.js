const tokenService = require("./token.service");
const config = require("../config/config");
const constant = require("../config/constant");
const userService = require("./users.service");

import bcrypt from "bcryptjs";

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

const register = async (name, email, password) => {
  console.log(email, password, name);
  const user = await userService.createUserWithMailPassword(
    name,
    email,
    password
  );
  const token = await tokenService.generateAuthTokens(user);
  console.log("token", token);
  return token;
  // res.send("register");
};
const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return { status: "error", message: "User not found" };
    }
    const islogin = await isPasswordMatch(user, password);
    if (!islogin) {
      return { status: "error", message: "Password not match" };
    }
    if (user.active === false) {
      return { status: "error", message: "Your account is block" };
    }
    if (user.mail_active === false) {
      return { status: "error", message: "Your account is not active" };
    }
    const token = await tokenService.generateAuthTokens(user);
    return { status: "success", token };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const isPasswordMatch = async (user, password) => {
  if (!user.password) {
    throw new ApiError(
      BAD_REQUEST,
      "Something went wrong with your password, please connect to my team to get a new password"
    );
  }
  return bcrypt.compare(password, user.password);
};

const verifyEmail = async (verifyEmailToken) => {
  console.log("token", verifyEmailToken);
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      "verifyEmail"
    );
    console.log("verifyEmailTokenDoc", verifyEmailTokenDoc);
    const user = await userService.isActiveMail(verifyEmailTokenDoc.user_id);
    console.log("usssssssssssssssssssssssssssssssssssssssssssssssssser", user);
    if (!user) {
      throw new Error();
    }
    await tokenService.deleteTokenVerifyMail(verifyEmailTokenDoc.user_id, verifyEmailToken);
  } catch (error) {
    throw  "Email verification failed" + error;
  }
};
exports.googleAuthenticationCallBack = googleAuthenticationCallBack;
exports.register = register;
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
exports.verifyEmail = verifyEmail;
