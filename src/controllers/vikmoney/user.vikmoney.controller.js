const passport = require("passport");
const catchAsync = require("../../utils/catchAsync");
const userService = require("../../services/vikmoney/users.vikmoney.service");
const config = require("../../config/config");
const tokenService = require("../../services/vikmoney/token.vikmoney.service");
const emailService = require("../../services/vikmoney/email.vikmoney.service");

const updateInforLoginEmail = async (req, res) => {
  const userInfo = req.body;
  const userData = req.user;
  console.log(userData);

  const result = await userService.updateInforLoginEmail(
    userInfo,
    userData.user_id,
    userData.user_name
  );
  res.status(200).json(result);
};
const getInfor = async (req, res) => {
  const userInfo = req.user;
  console.log(userInfo);
  const result = await userService.getInfor(userInfo);
  res.status(200).json(result);
};

const getAllUser = async (req, res) => {
  const { page, limit } = req.body;
  const result = await userService.getAllUser(page, limit);
  res.status(200).json(result);
};

const blockUser = async (req, res) => {
  const { userIds } = req.body;
  const result = await userService.blockUser(userIds);
  res.status(200).json(result);
};

const updateRoleUsers = async (req, res) => {
  const { userIds, role } = req.body;
  console.log(userIds);
  const result = await userService.updateRoleUsers(userIds, role);
  res.status(200).json(result);
};

module.exports = {
  updateInforLoginEmail,
  getInfor,
  getAllUser,
  blockUser,
  updateRoleUsers,
};
