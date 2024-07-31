const passport = require("passport");
const catchAsync = require("../../utils/catchAsync");
const config = require("../../config/config");
const rootService = require("../../services/trafficuser/root.traffic.service");

const insertUserMail = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await rootService.insertUserMail(name, email, password);
  res.status(200).json(result);
};

const activeMail = async (req, res) => {
  const {userName, userId} = req.body;
  const result = await rootService.activeMail(userId, userName);
  res.status(200).json(result);
};

const updateInforUser = async (req, res) => {
  const userInfo = req.body;

  const result = await rootService.updateInforUser(userInfo);
  res.status(200).json(result);
};
module.exports = {
  insertUserMail,
  activeMail,
  updateInforUser,
};
