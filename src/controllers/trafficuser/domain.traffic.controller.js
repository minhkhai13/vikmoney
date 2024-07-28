const passport = require("passport");
const catchAsync = require("../../utils/catchAsync");
const config = require("../../config/config");
const domainService = require("../../services/trafficuser/domain.traffic.service");

const setUpDomain = async (req, res) => {
  try {
    const domainInfo = req.body.domain;
    const userID = req.user.user_id;
    const result = await domainService.setUpDomain(domainInfo, userID);
    console.log("domainInfo", domainInfo);

    console.log("userID", userID);
    res.send(result);
  } catch (error) {}
};

const getAllDomain = async (req, res) => {
  try {
    const userID = req.user.user_id;
    const result = await domainService.getAllDomain(userID);
    res.send(result);
    }
    catch (error) {}
}

const verifyDomain = async (req, res) => {
  try {
    const domainInfo = req.body.domain;
    const userID = req.user.user_id;
    const result = await domainService.verifyDomain(domainInfo, userID);
    res.send(result);
  } catch (error) {}
};
module.exports = { setUpDomain, getAllDomain, verifyDomain };
