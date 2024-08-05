const Joi = require("joi");

const createGoogleSearch = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    info: Joi.string().required(),
    totalView: Joi.number().required(),
    totalViewDay: Joi.number().required(),
    action: Joi.array()
      .items(
        Joi.object({
          type: Joi.string()
            .valid("TH1", "TH2", "TH3", "TH4", "TH5", "TH6", "TH7")
            .required(),
          keyword: Joi.string().required(),
          url: Joi.string().required(),
          totalView: Joi.number().required(),
          totalViewDay: Joi.number().required(),
          anchorText: Joi.string().optional(),
          idAnchorText: Joi.string().optional(),
          idAds: Joi.string().optional(),
          idSubmitForm: Joi.string().optional(),
          nameSubmitForm: Joi.string().optional(),
          idPlayVideo: Joi.string().optional(),
          percentScroll: Joi.number().optional(),
          numberNextPage: Joi.number().optional(),
          image: Joi.string().optional(),
        })
      )
      .required(),
    timeMin: Joi.number().required(),
    timeMax: Joi.number().required(),
    level: Joi.number().required(),
  }),
};

const createDirect = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    info: Joi.string().required(),
    totalView: Joi.number().required(),
    totalViewDay: Joi.number().required(),
    action: Joi.array()
      .items(
        Joi.object({
          type: Joi.string()
            .valid("TH1", "TH2", "TH3", "TH4", "TH5", "TH6", "TH7")
            .required(),
          url: Joi.string().required(),
          totalView: Joi.number().required(),
          totalViewDay: Joi.number().required(),
          anchorText: Joi.string().optional(),
          idAnchorText: Joi.string().optional(),
          idAds: Joi.string().optional(),
          idSubmitForm: Joi.string().optional(),
          nameSubmitForm: Joi.string().optional(),
          idPlayVideo: Joi.string().optional(),
          percentScroll: Joi.number().optional(),
          numberNextPage: Joi.number().optional(),
          image: Joi.string().optional(),
        })
      )
      .required(),
    timeMin: Joi.number().required(),
    timeMax: Joi.number().required(),
    level: Joi.number().required(),
  }),
};

const createClickBacklink = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    info: Joi.string().required(),
    totalView: Joi.number().required(),
    totalViewDay: Joi.number().required(),
    action: Joi.array()
      .items(
        Joi.object({
          type: Joi.string()
            .valid("TH1", "TH2", "TH3", "TH4", "TH5", "TH6", "TH7")
            .required(),
          urlBacklink: Joi.string().required(),
          anchorTextToWebsite: Joi.string().required(),
          totalView: Joi.number().required(),
          totalViewDay: Joi.number().required(),
          anchorText: Joi.string().optional(),
          idAnchorText: Joi.string().optional(),
          idAds: Joi.string().optional(),
          idSubmitForm: Joi.string().optional(),
          nameSubmitForm: Joi.string().optional(),
          idPlayVideo: Joi.string().optional(),
          percentScroll: Joi.number().optional(),
          numberNextPage: Joi.number().optional(),
          image: Joi.string().optional(),
        })
      )
      .required(),
    timeMin: Joi.number().required(),
    timeMax: Joi.number().required(),
    level: Joi.number().required(),
  }),
};

module.exports = {
  createGoogleSearch,
  createDirect,
  createClickBacklink,
};
