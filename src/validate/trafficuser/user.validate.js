const Joi = require("joi");
const { role } = require("../custom.validate");

const updateInforLoginEmail = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    birthday: Joi.string().allow('').required(),
    sex: Joi.bool().required(),
    location: Joi.string().allow('').required(),
    phoneNumber: Joi.string().allow('').required(),
    inforDetail: Joi.string().allow('').required(),
    avatar: Joi.string().allow('').required(),
  }),
};
const getAllUser = {
  query: Joi.object().keys({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(1).required(),
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

const updateDackModeLaguage = { 
  body: Joi.object().keys({
    dackMode: Joi.bool().required(),
    laguage: Joi.string().required(),
  }),
};
module.exports = {
  updateInforLoginEmail,
  getAllUser,
  blockUser,
  updateRoleUsers,
  updateDackModeLaguage,
};
