require("dotenv").config();

// config/cors.js
const configCors = (req, res, next) => {
  const allowedOrigins = [
    process.env.HOST_FE,
    process.env.HOST_VIK,
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true"); // Đảm bảo viết đúng là "true"

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

module.exports = configCors;
