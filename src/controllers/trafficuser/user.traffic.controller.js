const passport = require("passport");
const catchAsync = require("../../utils/catchAsync");
const userService = require("../../services/trafficuser/users.traffic.service");
const config = require("../../config/config");
const tokenService = require("../../services/trafficuser/token.traffic.service");
const emailService = require("../../services/trafficuser/email.traffic.service");

const updateInfor = async (req, res) => {
  const userInfo = req.body.user;
  const result = await userService.updateInfor(userInfo);
  res.status(200).json(result);
};
const getInfor = async (req, res) => {
  const userInfo = req.user;
  console.log(userInfo);
  const result = await userService.getInfor(userInfo);
  res.status(200).json(result);
};

module.exports = {
  updateInfor,
  getInfor,
};
