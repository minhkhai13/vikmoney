const Joi = require("joi");

const setupDomain = {
  body: Joi.object().keys({
    domain: Joi.string().required(),
    domainName: Joi.number().required(),
    domainInfo: Joi.string().required(),
  }),
};

const getAllDomain = {
  query: Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required(),
  }),
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
