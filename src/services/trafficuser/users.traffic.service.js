const db = require("../../database/models/index");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const ApiError = require("../../utils/apiError");
const config = require("../../config/config");

const cleanText = (text) => {
  let value = text || "";
  value = value.trim();
  value = value.toLowerCase();
  return value;
};

const getAllUsers = async () => {
  return db.User.findAll();
};

const createUserMail = async (name, email, phone_number) => {
  try {
    const user = {
      full_name: name,
      user_name: email,
      email: email,
      role: "user",
      active: true,
      mail_active: false,
      phone_number: phone_number || null,
    };
    let checkUser = await db.User.findOne({
      where: { user_name: email },
      raw: true,
      attributes: ["id"],
    });
    if (checkUser) {
      return ApiError.errorCode310("Email is exist");
    }
    const result = await db.User.create(user);
    if (result) {
      return ApiError.errorCode200("Create user success", result);
    }
    return result;
  } catch (error) {
    console.log(error);
    return ApiError.errorCode310(error);
  }
};

const getUserByEmail = async (email) => {
  console.log(email);
  return await db.User.findOne({
    where: { email: email },
    raw: true,
    attributes: [
      "id",
      "user_name",
      "full_name",
      "email",
      "role",
      "password",
      "active",
      "mail_active",
      "avatar",
      "birthday",
      "sex",
      "phone_number",
      "location",
      "money",
      "infor_detail",
    ],
  });
};

const getUserById = async (id) => {
  try {
    return await db.User.findOne({
      where: { id: id },
      raw: true,
      attributes: ["id", "user_name", "role", "active", "mail_active"],
    });
  } catch (error) {
    ApiError.errorCode310(error);
  }
};

const createUserWithMailPassword = async (name, email, password) => {
  // hash pasword
  try {
    const cleanEmail = cleanText(email);
    const cleanName = cleanText(name);
    const hashPassword = await bcrypt.hashSync(password, config.hashRound);
    const user = {
      full_name: cleanName,
      email: cleanEmail,
      user_name: cleanEmail,
      password: hashPassword,
      role: "user",
      active: true,
      mail_active: false,
    };
    let checkUser = await db.User.findOne({
      where: {
        [Op.or]: [{ email: cleanEmail }, { user_name: cleanEmail }],
      },
      raw: true,
      attributes: ["id"],
    });
    console.log("checkUser, ", checkUser);
    if (checkUser) {
      return ApiError.errorCode205();
    }
    const result = await db.User.create(user);
    if (!result) {
      return ApiError.errorCode310("Create user error");
    }
    return ApiError.errorCode200("Create user success", result);
  } catch (error) {
    console.log(error);
    return ApiError.errorCode310(error);
  }
};

const isActiveMail = async (id) => {
  try {
    return await db.User.update(
      { mail_active: true },
      {
        where: { id: id },
      }
    );
  } catch (error) {
    throw ApiError.errorCode310(error);
  }
};

const updatePassword = async (id, userName, password) => {
  try {
    const hashPassword = await bcrypt.hashSync(password, config.hashRound);
    await db.User.update(
      { password: hashPassword, updatedAt: new Date() },
      {
        where: { id: id, user_name: userName },
      }
    );
    return ApiError.errorCode200("Update password success");
  } catch (error) {
    return ApiError.errorCode310(error);
  }
};
const updateInfor = async (userInfo) => {
  try {
    const result = await db.User.update(
      {
        full_name: userInfo.full_name,
        user_name: userInfo.user_name,
        email: userInfo.email,
        role: userInfo.role,
        active: userInfo.active,
        mail_active: userInfo.mail_active,
        avatar: userInfo.avatar,
        birthday: userInfo.b,
      },
      {
        where: { id: userInfo.id, user_name: userInfo.user_name },
      }
    );
    if (result) {
      return ApiError.errorCode200("Update infor success");
    }
    return ApiError.errorCode310("Update infor error");
  } catch (error) {
    return ApiError.errorCode310(error);
  }
};

const getInfor = async (userInfo) => {
  try {
    if (!userInfo.user_id || !userInfo.user_name) {
      return ApiError.errorCode310("User not found");
    }
    const infoData = await db.User.findOne({
      where: { id: userInfo.user_id, user_name: userInfo.user_name },
      raw: true,
      attributes: [
        "id",
        "full_name",
        "email",
        "avatar",
        "birthday",
        "location",
        "phone_number",
        "infor_detail",
        "money",
        "sex",
      ],
    });
    if (!infoData) {
      return ApiError.errorCode310("User not found");
    }
    return ApiError.errorCode200("Get infor success", infoData);
  } catch (error) {
    return ApiError.errorCode310(error);
  }
};
module.exports = {
  getAllUsers,
  createUserMail,
  getUserByEmail,
  createUserWithMailPassword,
  isActiveMail,
  getUserById,
  updatePassword,
  updateInfor,
  getInfor,
};
