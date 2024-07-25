const Joi = require("joi");
const { password } = require("./custom.validate");

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const googleAuthentication = {
  query: Joi.object().keys({
    session: Joi.string().required(),
    redirectUrl: Joi.string().required().default("/"),
  }),
};

const facebookAuthentication = {
  query: Joi.object().keys({
    session: Joi.string().required(),
    redirectUrl: Joi.string().required().default("/"),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const active = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

const googleAuthenticationCallBack = {};
const facebookAuthenticationCallBack = {};

module.exports = {
  login,
  logout,
  active,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshTokens,
  facebookAuthentication,
  googleAuthentication,
  googleAuthenticationCallBack,
  facebookAuthenticationCallBack,
  register,
};
