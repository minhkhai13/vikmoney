const db = require("../../database/models/index");
const ApiError = require("../../utils/apiError");
const { Op } = require("sequelize");

const createGoogleSearch = async (userId, dataCamp) => {
  const type = "GoogleSearch";
  const transaction = await db.sequelize.transaction();

  try {
    const {
      name,
      isUrl,
      info,
      domainId,
      totalView,
      totalViewDay,
      action,
      timeMin,
      timeMax,
      level,
    } = dataCamp;
    const dataInsertCampaign = await insertCampaign(
      name,
      userId,
      domainId,
      type,
      level,
      totalView,
      totalViewDay,
      info,
      transaction
    );
    if (dataInsertCampaign.errorcode !== 200) {
      return dataInsertCampaign;
    }
    const campaignId = dataInsertCampaign.data.id;
    const dataInsertGGSearch = await preDataInsertGGSearch(
      isUrl,
      dataCamp,
      campaignId,
      level,
      timeMin,
      timeMax
    );
    let result = null;
    const lengthData = dataInsertGGSearch.length;

    if (isUrl) {
      let levelNow = lengthData + 1;
      result = await db.GoogleSearch.create(
        {
          campaign_id: campaignId,
          action: dataInsertGGSearch,
          time_min: timeMin,
          time_max: timeMax,
          url: dataCamp.url,
          keyword: dataCamp.keyword,
          total_view: dataCamp.totalView,
          day_view: dataCamp.totalViewDay,
          level: levelNow,
        },
        {
          raw: true,
          transaction: transaction,
        }
      );
    } else {
      result = await db.GoogleSearch.bulkCreate(dataInsertGGSearch, {
        raw: true,
        transaction,
      });
    }
    if (result) {
      const resultCampaign = await transaction.commit();
      return ApiError.errorCode200("Create campaign success", result);
    } else {
      await transaction.rollback();
      return ApiError.errorCode310("Create campaign failed");
    }
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return ApiError.errorCode310(error.message || "Create campaign failed");
  }
};

const createDirect = async (userId, dataCamp) => {
  const type = "Direct";
  const transaction = await db.sequelize.transaction();
  try {
    const {
      name,
      isUrl,
      info,
      domainId,
      totalView,
      totalViewDay,
      action,
      timeMin,
      timeMax,
      level,
    } = dataCamp;
    const dataInsertCampaign = await insertCampaign(
      name,
      userId,
      domainId,
      type,
      level,
      totalView,
      totalViewDay,
      info,
      transaction
    );
    if (dataInsertCampaign.errorcode !== 200) {
      return dataInsertCampaign;
    }
    const campaignId = dataInsertCampaign.data.id;
    const dataInsertDirect = await preDataInsertDirect(
      isUrl,
      dataCamp,
      campaignId,
      level,
      timeMin,
      timeMax
    );
    let result = null;
    const lengthData = dataInsertDirect.length;

    if (isUrl) {
      let levelNow = lengthData == 1 ? lengthData : lengthData + 1;
      result = await db.GoogleDirect.create(
        {
          campaign_id: campaignId,
          action: dataInsertDirect,
          time_min: timeMin,
          time_max: timeMax,
          url: dataCamp.url,
          total_view: dataCamp.totalView,
          day_view: dataCamp.totalViewDay,
          level: levelNow,
        },
        {
          raw: true,
          transaction: transaction,
        }
      );
    } else {
      console.log("dataInsertDirect", dataInsertDirect);
      result = await db.GoogleDirect.bulkCreate(dataInsertDirect, {
        raw: true,
        transaction,
      });
    }

    if (result) {
      await transaction.commit();
      return ApiError.errorCode200("Create campaign success", result);
    } else {
      await transaction.rollback();
      return ApiError.errorCode310("Create campaign failed");
    }
  } catch (error) {
    console.log(error, "dssssss");
    await transaction.rollback();
    return ApiError.errorCode310(error.message || "Create campaign failed");
  }
};

const createClickBacklink = async (userId, dataCamp) => {
  const type = "ClickBacklink";
  const transaction = await db.sequelize.transaction();
  try {
    const {
      name,
      isUrl,
      info,
      domainId,
      totalView,
      totalViewDay,
      action,
      timeMin,
      timeMax,
      level,
    } = dataCamp;
    const dataInsertCampaign = await insertCampaign(
      name,
      userId,
      domainId,
      type,
      level,
      totalView,
      totalViewDay,
      info,
      transaction
    );
    if (dataInsertCampaign.errorcode !== 200) {
      return dataInsertCampaign;
    }
    const campaignId = dataInsertCampaign.data.id;
    const dataInsertDirect = await preDataInsertClickBacklink(
      isUrl,
      dataCamp,
      campaignId,
      level,
      timeMin,
      timeMax
    );
    let result = null;
    const lengthData = dataInsertDirect.length;

    if (isUrl) {
      let levelNow = lengthData == 1 ? lengthData : lengthData + 1;
      result = await db.ClickBacklink.create(
        {
          campaign_id: campaignId,
          action: dataInsertDirect,
          time_min: timeMin,
          time_max: timeMax,
          url_backlink: dataCamp.urlBacklink,
          anchor_text_url: dataCamp.anchorTextUrl,
          total_view: dataCamp.totalView,
          day_view: dataCamp.totalViewDay,
          level: levelNow,
        },
        {
          raw: true,
          transaction: transaction,
        }
      );
    } else {
      console.log("dataInsertDirect", dataInsertDirect);
      result = await db.ClickBacklink.bulkCreate(dataInsertDirect, {
        raw: true,
        transaction,
      });
    }

    if (result) {
      await transaction.commit();
      return ApiError.errorCode200("Create campaign success", result);
    } else {
      await transaction.rollback();
      return ApiError.errorCode310("Create campaign failed");
    }
  } catch (error) {
    console.log(error, "dssssss");
    await transaction.rollback();
    return ApiError.errorCode310(error.message || "Create campaign failed");
  }
};

const insertCampaign = async (
  name,
  userId,
  domainId,
  type,
  level,
  total_view,
  day_view,
  detail_info,
  transaction
) => {
  try {
    const result = await db.Campaign.create(
      {
        name: name,
        user_id: userId,
        domain_id: domainId,
        type: type,
        level: level,
        total_view: total_view,
        day_view: day_view,
        total_viewed: 0,
        day_viewed: 0,
        status: false,
        isPause: false,
        progress: 0,
        info: detail_info,
      },
      {
        raw: true,
        transaction: transaction,
      }
    );
    if (result) {
      return ApiError.errorCode200("Create campaign success", result);
    }
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return ApiError.errorCode311("Campaign name already exists");
    }
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return ApiError.errorCode311("Domain not found");
    }
    return ApiError.errorCode310(error.message || "Create campaign failed");
  }
};

const preDataInsertGGSearch = async (
  isUrl,
  dataCamp,
  campId,
  level,
  timeMin,
  timeMax
) => {
  try {
    const { action } = dataCamp;
    const arrayAction = [];
    for (let i = 0; i < action.length; i++) {
      switch (action[i].type) {
        case "TH1":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              keyword: action[i].keyword,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([{ type: action[i].type }]),
            });
          }
          break;
        case "TH2":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              percentScroll: action[i].percentScroll,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              keyword: action[i].keyword,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  percentScroll: action[i].percentScroll,
                },
              ]),
            });
          }
          break;
        case "TH3":
          console.log("sss", "action[i]");
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              anchorText: action[i].anchorText,
              idAnchorText: action[i].idAnchorText,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              keyword: action[i].keyword,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  anchorText: action[i].anchorText,
                  idAnchorText: action[i].idAnchorText,
                },
              ]),
            });
          }
          break;
        case "TH4":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              nameSubmitForm: action[i].nameSubmitForm,
              idSubmitForm: action[i].idSubmitForm,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              keyword: action[i].keyword,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  nameSubmitForm: action[i].nameSubmitForm,
                  idSubmitForm: action[i].idSubmitForm,
                },
              ]),
            });
          }
          break;
        case "TH5":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              idAds: action[i].idAds,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              keyword: action[i].keyword,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  idAds: action[i].idAds,
                },
              ]),
            });
          }
          break;
        case "TH6":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              idPlayVideo: action[i].idPlayVideo,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              keyword: action[i].keyword,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  idPlayVideo: action[i].idPlayVideo,
                },
              ]),
            });
          }
          break;
        case "TH7":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              numberNextPage: action[i].numberNextPage,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              keyword: action[i].keyword,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  numberNextPage: action[i].numberNextPage,
                },
              ]),
            });
          }
          break;
      }
    }
    return arrayAction;
  } catch (error) {
    console.log(error);
  }
};

const preDataInsertDirect = async (
  isUrl,
  dataCamp,
  campId,
  level,
  timeMin,
  timeMax
) => {
  try {
    const { action } = dataCamp;
    const arrayAction = [];
    for (let i = 0; i < action.length; i++) {
      switch (action[i].type) {
        case "TH1":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([{ type: action[i].type }]),
            });
          }
          break;
        case "TH2":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              percentScroll: action[i].percentScroll,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  percentScroll: action[i].percentScroll,
                },
              ]),
            });
          }
          break;
        case "TH3":
          console.log("sss", "action[i]");
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              anchorText: action[i].anchorText,
              idAnchorText: action[i].idAnchorText,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  anchorText: action[i].anchorText,
                  idAnchorText: action[i].idAnchorText,
                },
              ]),
            });
          }
          break;
        case "TH4":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              nameSubmitForm: action[i].nameSubmitForm,
              idSubmitForm: action[i].idSubmitForm,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  nameSubmitForm: action[i].nameSubmitForm,
                  idSubmitForm: action[i].idSubmitForm,
                },
              ]),
            });
          }
          break;
        case "TH5":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              idAds: action[i].idAds,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  idAds: action[i].idAds,
                },
              ]),
            });
          }
          break;
        case "TH6":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              idPlayVideo: action[i].idPlayVideo,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  idPlayVideo: action[i].idPlayVideo,
                },
              ]),
            });
          }
          break;
        case "TH7":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              numberNextPage: action[i].numberNextPage,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              url: action[i].url,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  numberNextPage: action[i].numberNextPage,
                },
              ]),
            });
          }
          break;
      }
    }
    return arrayAction;
  } catch (error) {
    console.log(error);
  }
};

const preDataInsertClickBacklink = async (
  isUrl,
  dataCamp,
  campId,
  level,
  timeMin,
  timeMax
) => {
  try {
    const { action } = dataCamp;
    const arrayAction = [];
    for (let i = 0; i < action.length; i++) {
      switch (action[i].type) {
        case "TH1":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              anchor_text_url: action[i].anchorTextUrl,
              url_backlink: action[i].urlBacklink,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([{ type: action[i].type }]),
            });
          }
          break;
        case "TH2":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              percentScroll: action[i].percentScroll,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              anchor_text_url: action[i].anchorTextUrl,
              url_backlink: action[i].urlBacklink,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  percentScroll: action[i].percentScroll,
                },
              ]),
            });
          }
          break;
        case "TH3":
          console.log("sss", "action[i]");
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              anchorText: action[i].anchorText,
              idAnchorText: action[i].idAnchorText,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              anchor_text_url: action[i].anchorTextUrl,
              url_backlink: action[i].urlBacklink,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  anchorText: action[i].anchorText,
                  idAnchorText: action[i].idAnchorText,
                },
              ]),
            });
          }
          break;
        case "TH4":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              nameSubmitForm: action[i].nameSubmitForm,
              idSubmitForm: action[i].idSubmitForm,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              anchor_text_url: action[i].anchorTextUrl,
              url_backlink: action[i].urlBacklink,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  nameSubmitForm: action[i].nameSubmitForm,
                  idSubmitForm: action[i].idSubmitForm,
                },
              ]),
            });
          }
          break;
        case "TH5":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              idAds: action[i].idAds,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              anchor_text_url: action[i].anchorTextUrl,
              url_backlink: action[i].urlBacklink,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  idAds: action[i].idAds,
                },
              ]),
            });
          }
          break;
        case "TH6":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              idPlayVideo: action[i].idPlayVideo,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              anchor_text_url: action[i].anchorTextUrl,
              url_backlink: action[i].urlBacklink,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  idPlayVideo: action[i].idPlayVideo,
                },
              ]),
            });
          }
          break;
        case "TH7":
          if (isUrl) {
            arrayAction.push({
              type: action[i].type,
              numberNextPage: action[i].numberNextPage,
            });
          } else {
            arrayAction.push({
              campaign_id: campId,
              anchor_text_url: action[i].anchorTextUrl,
              url_backlink: action[i].urlBacklink,
              total_view: action[i].totalView,
              day_view: action[i].totalViewDay,
              level: level,
              time_min: timeMin,
              time_max: timeMax,
              action: JSON.stringify([
                {
                  type: action[i].type,
                  numberNextPage: action[i].numberNextPage,
                },
              ]),
            });
          }
          break;
      }
    }
    return arrayAction;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createGoogleSearch,
  createDirect,
  createClickBacklink,
};
