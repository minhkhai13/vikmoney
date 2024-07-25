const db = require("../database/models/index");
import bcrypt from "bcryptjs";
const config = require("../config/config");

const cleanText = (text) => {
  let value = text || "";
  value = value.trim();
  value = value.toLowerCase();
  return value;
};

const getAllUsers = async () => {
  return db.User.findAll();
};

const createUser = async (name, email, phone_number) => {
  const user = {
    name: name,
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
    attributes: ["id", "name", "email", "role","password","active","mail_active"],
  });
};

const createUserWithMailPassword = async (name, email, password) => {
  // hash pasword
  try {
    const cleanEmail = cleanText(email);
    const cleanName = cleanText(name);
    const hashPassword = await bcrypt.hashSync(password, 10);
    const user = {
      name: cleanName,
      email: cleanEmail,
      password: hashPassword,
      role: "user",
      active: true,
      mail_active: false,
    };
    let checkUser = await db.User.findOne({
      where: { email: cleanEmail },
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
module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  createUserWithMailPassword,
};
