const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");
const config = require('../config/config');

const login = async (req, res) => {
  res.send("login");
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
  res.send("sendVerificationEmail");
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
  res.send("register");
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
