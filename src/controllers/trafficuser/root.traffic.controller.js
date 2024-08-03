const passport = require("passport");
const catchAsync = require("../../utils/catchAsync");
const config = require("../../config/config");
const rootService = require("../../services/trafficuser/root.traffic.service");

const insertUserMail = async (req, res) => {
  const { username, fullName, password } = req.body;
  const result = await rootService.insertUserMail(fullName, username, password);
  res.status(200).json(result);
};

const activeMail = async (req, res) => {
  const {userId} = req.body;
  const result = await rootService.activeMail(userId);
  res.status(200).json(result);
};

const unActiveMail = async (req, res) => {
  const {userId} = req.body;
  const result = await rootService.unActiveMail(userId);
  res.status(200).json(result);
};

const updateInforUser = async (req, res) => {
  const userInfo = req.body;

  const result = await rootService.updateInforUser(userInfo);
  res.status(200).json(result);
};

const rechargeUser = async (req, res) => {
  const {userId, money} = req.body;
  const result = await rootService.rechargeUser(userId, money);
  res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  const {userIds} = req.body;
  const result = await rootService.deleteUser(userIds);
  res.status(200).json(result);
};

const unBlockUser = async (req, res) => {
  const {userIds} = req.body;
  const result = await rootService.unBlockUser(userIds);
  res.status(200).json(result);
};

const getInfoUser = async (req, res) => {
  const {userId} = req.body;
  const result = await rootService.getInfoUser(userId);
  res.status(200).json(result);
};
module.exports = {
  insertUserMail,
  activeMail,
  updateInforUser,
  rechargeUser,
  deleteUser,
  unBlockUser,
  getInfoUser,
  unActiveMail,
};
