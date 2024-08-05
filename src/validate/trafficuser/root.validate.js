const Joi = require("joi");
const { password, role } = require("../custom.validate");
const { info } = require("winston");

const updateInforUser = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    birthday: Joi.string().allow("").required(),
    sex: Joi.bool().required(),
    location: Joi.string().allow("").required(),
    phoneNumber: Joi.string().allow("").required(),
    inforDetail: Joi.string().allow("").required(),
    avatar: Joi.string().allow(""),
    email: Joi.string().allow(""),
    username: Joi.string().required(),
    userId: Joi.number().required(),
    type: Joi.string().valid("email", "phoneNumber", "google").required(),
    role: Joi.string().valid("user", "admin", "buyer").required(),
  }),
};

const insertUserMail = {
  body: Joi.object().keys({
    fullName: Joi.string().required().empty("").not(null),
    username: Joi.string().required().empty("").not(null),
    password: Joi.string().required(password).empty("").not(null),
  }),
};

const activeMail = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const deleteUsers = {
  body: Joi.object().keys({
    userIds: Joi.array().items(Joi.number()).required(),
  }),
};

const rechargeUser = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    money: Joi.number().required(),
    info: Joi.string().allow("").required(),
  }),
};

const unBlockUser = {
  body: Joi.object().keys({
    userIds: Joi.array().items(Joi.number()).required(),
  }),
};

const getInfoUser = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};
module.exports = {
  updateInforUser,
  insertUserMail,
  activeMail,
  deleteUsers,
  rechargeUser,
  unBlockUser,
  getInfoUser,
};
