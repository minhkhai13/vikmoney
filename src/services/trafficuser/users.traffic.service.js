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
  return db.UserTraffic.findAll();
};

const createUserMail = async (name, email, phone_number) => {
  try {
    const user = {
      full_name: name,
      user_name: email,
      email: email,
      role: "user",
      status: true,
      active: false,
      phone_number: phone_number || null,
    };
    let checkUser = await db.UserTraffic.findOne({
      where: { user_name: email },
      raw: true,
      attributes: ["id"],
    });
    if (checkUser) {
      return ApiError.errorCode310("Email is exist");
    }
    const result = await db.UserTraffic.create(user);
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
  return await db.UserTraffic.findOne({
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
      "status",
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
    return await db.UserTraffic.findOne({
      where: { id: id },
      raw: true,
      attributes: ["id", "user_name", "role", "active", "status"],
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
      status: true,
      active: false,
      type_account: config.login.type.email,
    };
    let checkUser = await db.UserTraffic.findOne({
      where: {
        [Op.or]: [{ email: cleanEmail }, { user_name: cleanEmail }],
      },
      raw: true,
      attributes: ["id"],
    });
    if (checkUser) {
      return ApiError.errorCode205();
    }
    const result = await db.UserTraffic.create(user,{returning:['id','full_name','email','user_name','role','status','active','type_account']});
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
    return await db.UserTraffic.update(
      { active: true },
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
    await db.UserTraffic.update(
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

const updateInforLoginEmail = async (userInfo, id, userName) => {
  try {
    console.log(userInfo);
    console.log(id, userName);
    const result = await db.UserTraffic.update(
      {
        full_name: userInfo.fullName,
        avatar: userInfo.avatar,
        birthday: userInfo.birthday,
        location: userInfo.location,
        phone_number: userInfo.phoneNumber,
        infor_detail: userInfo.inforDetail,
        sex: userInfo.sex,
      },
      {
        where: { id: id, user_name: userName },
      }
    );
    if (result) {
      return ApiError.errorCode200("Update infor success");
    }
    return ApiError.errorCode310("Update infor error");
  } catch (error) {
    console.log(error);
    return ApiError.errorCode310(error);
  }
};

const updateInforLoginPhoneNumber = async (userInfo, id, userName) => {
  try {
    console.log(userInfo);
    console.log(id, userName);
    const result = await db.UserTraffic.update(
      {
        full_name: userInfo.fullName,
        avatar: userInfo.avatar,
        birthday: userInfo.birthday,
        location: userInfo.location,
        email: userInfo.email,
        infor_detail: userInfo.inforDetail,
        sex: userInfo.sex,
      },
      {
        where: { id: id, user_name: userName },
      }
    );
    if (result) {
      return ApiError.errorCode200("Update infor success");
    }
    return ApiError.errorCode310("Update infor error");
  } catch (error) {
    console.log(error);
    return ApiError.errorCode310(error);
  }
};

const getInfor = async (userInfo) => {
  try {
    if (!userInfo.user_id || !userInfo.user_name) {
      return ApiError.errorCode310("UserTraffic not found");
    }
    const infoData = await db.UserTraffic.findOne({
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
      return ApiError.errorCode310("UserTraffic not found");
    }
    return ApiError.errorCode200("Get infor success", infoData);
  } catch (error) {
    return ApiError.errorCode310(error);
  }
};

const getAllUser = async (page, limit) => {
  try {
    const offet = (page - 1) * limit;
    const result = await db.UserTraffic.findAndCountAll({
      offset: offet,
      limit: limit,
      raw: true,
      attributes: [
        "id",
        "user_name",
        "full_name",
        "email",
        "birthday",
        "location",
        "phone_number",
        "infor_detail",
        "avatar",
        "money",
        "type_account",
      ],
    });
    if (!result) {
      return ApiError.errorCode310("Get all user error");
    }
    return ApiError.errorCode200("Get all user success", result);
  } catch (error) {
    return ApiError.errorCode310(error);
  }
};

const blockUser = async (arrayId) => {
  try {
    const result = await db.UserTraffic.update(
      { status: false },
      {
        where: { id: arrayId, role: { [db.Sequelize.Op.ne]: "root" } },
      }
    );
    if (!result) {
      return ApiError.errorCode310("Block user error");
    }
    return ApiError.errorCode200("Block user success");
  } catch (error) {
    return ApiError.errorCode310(error);
  }
};

const updateRoleUsers = async (arrayId, role) => {
  try {
    const result = await db.UserTraffic.update(
      { role: role },
      {
        where: { id: arrayId, role: { [db.Sequelize.Op.ne]: "root" } },
      }
    );
    if (!result) {
      return ApiError.errorCode310("Update role user error");
    }
    return ApiError.errorCode200("Update role user success");
  } catch (error) {
    if (error.errorcode) {
      return error;
    }
    return ApiError.errorCode310(error);
  }
};

const activeMail = async (userId, userName) => {
  try {
    const result = await db.UserTraffic.update(
      { active: true },
      {
        where: { id: userId, user_name: userName },
      }
    );
    if (!result) {
      return ApiError.errorCode310("Active mail error");
    }
    return ApiError.errorCode200("Active mail success");
  } catch (error) {
    console.log(error);
    return ApiError.errorCode310((error));
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
  updateInforLoginEmail,
  getInfor,
  getAllUser,
  blockUser,
  updateRoleUsers,
  updateInforLoginPhoneNumber,
  activeMail,
};
