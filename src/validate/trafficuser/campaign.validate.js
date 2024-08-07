const Joi = require("joi");

const createGoogleSearch = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      isUrl: Joi.boolean().required(),
      info: Joi.string().required(),
      domainId: Joi.number().required(),
      totalView: Joi.number().required(),
      totalViewDay: Joi.number().required(),
      keyword: Joi.string().optional(),
      url: Joi.string().optional(),
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
            .when(Joi.object({ type: Joi.valid("TH1") }).unknown(), {
              then: Joi.object({}),
            })
            .when(Joi.object({ type: Joi.valid("TH2") }).unknown(), {
              then: Joi.object({
                percentScroll: Joi.string().required(),
              }),
            })
            .when(Joi.object({ type: Joi.valid("TH3") }).unknown(), {
              then: Joi.object({
                idAnchorText: Joi.string().required(),
                anchorText: Joi.string().required(),
              }),
            })
            .when(Joi.object({ type: Joi.valid("TH4") }).unknown(), {
              then: Joi.object({
                idSubmitForm: Joi.string().required(),
                nameSubmitForm: Joi.string().required(),
              }),
            })
            .when(Joi.object({ type: Joi.valid("TH5") }).unknown(), {
              then: Joi.object({
                idAds: Joi.string().required(),
              }),
            })
            .when(Joi.object({ type: Joi.valid("TH6") }).unknown(), {
              then: Joi.object({
                idPlayVideo: Joi.string().required(),
              }),
            })
            .when(Joi.object({ type: Joi.valid("TH7") }).unknown(), {
              then: Joi.object({
                numberNextPage: Joi.number().required(),
              }),
            })
        )
        .required(),
      timeMin: Joi.number().required(),
      timeMax: Joi.number().required(),
      level: Joi.number().required(),
    })
    .when(Joi.object({ isUrl: true }).unknown(), {
      then: Joi.object({
        keyword: Joi.string().required(),
        url: Joi.string().required(),
      }),
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
