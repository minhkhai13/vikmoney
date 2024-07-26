const config = require("../config/config");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.query.token || req.body.user.token;
  console.log(token, "tokddddddddddddddddddddden");
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  try {
    const userInfo = await jwt.verify(token, config.jwt.secret);
    if (userInfo) {
      req.user = userInfo.sub;
      console.log(req.user, "req.user");
      next();
    } else {
      return res.status(401).send({ message: "Unauthorized!" });
    }
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized!" + error });
  }
};

module.exports = verifyToken;
