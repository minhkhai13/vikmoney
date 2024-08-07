const campaignService = require("../../services/trafficuser/camp.traffic.service");
const historyService = require("../../services/trafficuser/history.traffic.service");
const config = require("../../config/config");

const createGoogleSearch = async (req, res) => {
  try {
    const userID = req.user.user_id;
    const dataCamp = req.body;
    const result = await campaignService.createGoogleSearch(userID, dataCamp);
    // console.log(result);
    // if (result.errorcode === 200) {
    //   historyService.logHistory(
    //     userID,
    //     config.log.traffic.createGoogleSearch,
    //     req.deviceInfo.browserName,
    //     req.deviceInfo.deviceType,
    //     req.deviceInfo.ip,
    //     200
    //   );
    // }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const createDirect = async (req, res) => {
  try {
    const userID = req.user.user_id;
    const dataCamp = req.body;
    const result = await campaignService.createDirect(userID, dataCamp);
    if (result.errorcode === 200) {
      historyService.logHistory(
        userID,
        config.log.traffic.createDirect,
        req.deviceInfo.browserName,
        req.deviceInfo.deviceType,
        req.deviceInfo.ip,
        200
      );
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const createClickBacklink = async (req, res) => {
  try {
    const userID = req.user.user_id;
    const dataCamp = req.body;
    const result = await campaignService.createClickBacklink(userID, dataCamp);
    if (result.errorcode === 200) {
      historyService.logHistory(
        userID,
        config.log.traffic.createClickBacklink,
        req.deviceInfo.browserName,
        req.deviceInfo.deviceType,
        req.deviceInfo.ip,
        200
      );
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createGoogleSearch, createDirect, createClickBacklink };