const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");
const config = require('../config/config');
const tokenService = require("../services/token.service");

const login = async (req, res) => {
  const { email, password } = req.body
  const result = await authService.loginUserWithEmailAndPassword(email, password)
  res.send(result)
};

const logout = async (req, res) => {
 req.session.destroy();
  res.send("logout");
};

const active = async (req, res) => {
  res.send("active");
};

const verifyEmail = async (req, res) => {
  res.send("verifyEmail");
};

const refreshTokens = async (req, res) => {
  res.send("refreshTokens");
};

const forgotPassword = async (req, res) => {
  res.send("forgotPassword");
};

const resetPassword = async (req, res) => {
  res.send("resetPassword");
};

const sendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const result = await authService.sendVerificationEmail(email);
  res.send(result);
};



const googleAuthenticationCallBack = catchAsync(async (req, res) => {
  console.log(req.query, "req.query");
  const result = await authService.googleAuthenticationCallBack(req.user, req.query.redirectUrl);
  console.log(result, "result");
  res.redirect(result);
});

const facebookAuthentication = async (req, res) => {
  res.send("facebookAuthentication");
};

const facebookAuthenticationCallBack = async (req, res) => {
  res.send("facebookAuthenticationCallBack");
};

const register = async (req, res) => {

  const { email, password, fullName } = req.body
  console.log(email, password, fullName);
  const user = await authService.register(fullName, email, password);
  

  res.send(user);
};

module.exports = {
  login,
  logout,
  active,
  verifyEmail,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  googleAuthenticationCallBack,
  facebookAuthentication,
  facebookAuthenticationCallBack,
  register,
};
