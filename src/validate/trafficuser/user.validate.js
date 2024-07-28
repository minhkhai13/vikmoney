const Joi = require("joi");
const { email } = require("../../config/config");

const updateInfo = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    birthday: Joi.string().required(),
    sex: Joi.bool().required(),
    location: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    birthday: Joi.string().required(),
  }),
};
module.exports = {
  updateInfo,
};
