const Joi = require("joi");
const { password } = require("../custom.validate");

const updateInforUser = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    birthday: Joi.string().allow('').required(),
    sex: Joi.bool().required(),
    location: Joi.string().allow('').required(),
    phoneNumber: Joi.string().allow('').required(),
    inforDetail: Joi.string().allow('').required(),
    avatar: Joi.string().allow(""),
    email: Joi.string().allow(""),
    userName: Joi.string().required(),
    userId: Joi.number().required(),
    type: Joi.string().valid('email', 'phoneNumber','google').required(),
  }),
};

const insertUserMail = {
  body: Joi.object().keys({
    name: Joi.string().required().empty("").not(null),
    email: Joi.string().required().empty("").not(null),
    password: Joi.string().required(password).empty("").not(null),
  }),
};

const activeMail = {
  params: Joi.object().keys({
    userName: Joi.string().required(),
    userId: Joi.number().required(),
  }),
};
module.exports = {
  updateInforUser,
  insertUserMail,
  activeMail,
};
