const Joi = require("joi");

const setupDomain = {
  body: Joi.object().keys({
    domain: Joi.string().required(),
    domainName: Joi.number().required(),
    domainInfo: Joi.string().required(),
  }),
};

const getAllDomain = {
  query: Joi.object().keys({}),
};

const verifyDomain = {
  body: Joi.object().keys({
    domain: Joi.string().required(),
  }),
};

module.exports = {
  setupDomain,
  getAllDomain,
  verifyDomain,
};
