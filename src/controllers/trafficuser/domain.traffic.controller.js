const passport = require("passport");
const catchAsync = require("../../utils/catchAsync");
const config = require("../../config/config");
const domainService = require("../../services/trafficuser/domain.traffic.service");
const historyService = require("../../services/trafficuser/history.traffic.service");

const setUpDomain = async (req, res) => {
  try {
    const domainInfo = req.body.domainInfo;
    const domain = req.body.domain;
    const domainName = req.body.domainName;
    const userID = req.user.user_id;
    const result = await domainService.setUpDomain(
      domain,
      domainName,
      domainInfo,
      userID
    );
    if (result.errorcode === 200) {
      historyService.logHistory(
        userID,
        config.log.traffic.setUpDomain,
        req.deviceInfo.browserName,
        domain,
        req.deviceInfo.deviceType,
        req.deviceInfo.ip,
        200
      );
    }
    res.status(200).send(result);
  } catch (error) {}
};

const getAllDomain = async (req, res) => {
  try {
    const userID = req.user.user_id;
    const {page, limit} = req.query;
    const result = await domainService.getAllDomain(userID, page, limit);
    res.status(200).send(result);
  } catch (error) {}
};

const verifyDomain = async (req, res) => {
  try {
    const domain = req.body.domain;
    if (!req.user || !req.user.user_id) {
      return res.send(ApiError.errorCode401());
    }
    const userID = req.user.user_id;
    const result = await domainService.verifyDomain(domain, userID);
    if (result.errorcode === 200) {
      historyService.logHistory(
        userID,
        config.log.traffic.verifyDomain,
        domain,
        req.deviceInfo.deviceType,
        req.deviceInfo.ip
      );
    }
    res.status(200).send(result);
  } catch (error) {}
};
module.exports = { setUpDomain, getAllDomain, verifyDomain };
