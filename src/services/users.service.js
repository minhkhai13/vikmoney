const db = require("../database/models/index");
import bcrypt from "bcryptjs";
const { Op } = require("sequelize");

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
    where: { email: email },
    raw: true,
    attributes: ["id"],
  });
  console.log("checkUser, ", checkUser);
  if (checkUser) {
    return { message: "Email already exists" };
  }
  console.log("user", user);
  const result = await db.User.create(user);
  console.log("result", result);
  return result;
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

const createUserWithMailPassword = async (name, email, password) => {
  // hash pasword
  try {
    const cleanEmail = cleanText(email);
    const cleanName = cleanText(name);
    const hashPassword = await bcrypt.hashSync(password, 10);
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
      return { message: "Email already exists" };
    }
    console.log("user", user);
    const result = await db.User.create(user);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
    return { message: "Error" };
  }
};

const isActiveMail = async (id) => {
  //udaate mail_active = true
  return await db.User.update(
    { mail_active: true },
    {
      where: { id: id },
    }
  );
};
module.exports = {
  getAllUsers,
  createUserMail,
  getUserByEmail,
  createUserWithMailPassword,
  isActiveMail,
};
