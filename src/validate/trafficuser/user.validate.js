const Joi = require("joi");
const { role } = require("../custom.validate");
const { query } = require("express");

const updateInforLoginEmail = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    birthday: Joi.string().required(),
    sex: Joi.bool().required(),
    location: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    inforDetail: Joi.string().required(),
    avatar: Joi.string().required(),
  }),
};
const getAllUser = {
  query: Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
  }),
};

const blockUser = {
  body: Joi.object().keys({
    userIds: Joi.array().items(Joi.number()).required(),
  }),
};

const updateRoleUsers = {
  body: Joi.object().keys({
    userIds: Joi.array().items(Joi.number()).required(),
    role: Joi.string().required().custom(role),
  }),
};
module.exports = {
  updateInforLoginEmail,
  getAllUser,
  blockUser,
  updateRoleUsers,
};
