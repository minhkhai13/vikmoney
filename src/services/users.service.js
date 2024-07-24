const db = require("../database/models/index");
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
    phone_number: phone_number||null,
    
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
    attributes: ["id","name","email","role"],
  });
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
};
