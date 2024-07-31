const db = require("../../database/models/index");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const ApiError = require("../../utils/apiError");
const config = require("../../config/config");
const userService = require("./users.traffic.service");

const cleanText = (text) => {
  let value = text || "";
  value = value.trim();
  value = value.toLowerCase();
  return value;
};

const insertUserMail = async (name, email, password) => {
  try {
    const result = userService.createUserWithMailPassword(
      name,
      email,
      password
    );
    return result;
  } catch (error) {
    console.log(error);
    if (error.errorcode) {
      return error;
    }
    return ApiError.errorCode310(error);
  }
};

const updateInforUser = async (userInfo) => {
  try {
    const type = userInfo.type;
    const user_id = userInfo.userId;
    const user_name = userInfo.userName;
    if (config.login.type.email == type) {
      const result = await userService.updateInforLoginEmail(
        userInfo,
        user_id,
        user_name
      );
      return result;
    } else if (config.login.type.phoneNumber == type) {
      const result = await userService.updateInforLoginPhoneNumber(
        userInfo,
        user_id,
        user_name
      );
      return result;
    }
    return ApiError.errorCode310("Type is not valid");
  } catch (error) {
    console.log(error);
    if (error.errorcode) {
      return error;
    }
    return ApiError.errorCode310(error);
  }
};

const activeMail = async (userID, userName) => {
  try {
    const result = await userService.activeMail(userID, userName);
    return result;
  } catch (error) {
    if (error.errorcode) {
      return error;
    }
    return ApiError.errorCode310(error);
  }
};

const rechargeUser = async (userId, money) => {
  try {
    const result = await userService.rechargeUser(userId, money);
    return result;
  } catch (error) {
    if (error.errorcode) {
      return error;
    }
    return ApiError.errorCode310(error);
  }
};

module.exports = {
  insertUserMail,
  updateInforUser,
  activeMail,
  rechargeUser,
};
