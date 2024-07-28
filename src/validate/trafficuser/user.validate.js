const Joi = require("joi");

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
  body: Joi.object().keys({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
  }),
};
module.exports = {
  updateInforLoginEmail,
  getAllUser,
};
