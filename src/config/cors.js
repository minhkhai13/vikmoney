require("dotenv").config();

// config/cors.js
// config/cors.js
const configCors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.HOST_FE); // Chỉ cho phép yêu cầu từ địa chỉ front-end
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Đảm bảo viết đúng là "true"
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = configCors;
