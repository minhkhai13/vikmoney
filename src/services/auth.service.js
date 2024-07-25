const tokenService = require("./token.service");
const googleConfig = require("../config/google");
const config = require("../config/config");
const constant = require("../config/constant");
const userService = require("./users.service");
import bcrypt from "bcryptjs";

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

const register = async (name, email, password) => {
  console.log(email, password, name);
  const user = await userService.createUserWithMailPassword(
    name,
    email,
    password
  );
  return user;
  // res.send("register");
};
const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);
    console.log(user);
    if (!user) {
      return { status: "error", message: "User not found" };
    }
    const islogin = await isPasswordMatch(user, password);
    if (!islogin) {
      return { status: "error", message: "Password not match" };
    }
    if(user.active === false){
      return { status: "error", message: "Your account is block" };
    }
    if(user.mail_active === false){
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


exports.generateGoogleAuthenticationUrl = generateGoogleAuthenticationUrl;
exports.googleAuthenticationCallBack = googleAuthenticationCallBack;
exports.register = register;
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
