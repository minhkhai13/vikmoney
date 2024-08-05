const config = require("../config/config");
const jwt = require("jsonwebtoken");
const userService = require("../services/vikmoney/users.vikmoney.service");
const ApiError = require("../utils/apiError");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(200).send(ApiError.errorCode401());
  }
  try {
    const userInfo = jwt.verify(token, config.jwt.secretVikmoney);
    console.log(userInfo, "userInfo");
    if (userInfo && userInfo.sub?.user_id) {
      const dataUser = await userService.getUserById(userInfo.sub?.user_id);
      if (!dataUser) {
        console.log("dataUser", dataUser);
        return res.status(101).send(ApiError.errorCode101());
      }
      if (!dataUser.status) {
        return res.status(102).send(ApiError.errorCode102());
      }
      if (!dataUser.active) {
        return res.status(100).send(ApiError.errorCode100());
      }
      req.user = userInfo.sub;
      next();
    } else {
      return res.status(200).send(ApiError.errorCode401());
    }
  } catch (error) {
    return res.status(200).send(ApiError.errorCode401());
  }
};

const verifyTokenSendMail = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const tokenLogin = authHeader && authHeader.split(" ")[1];
  console.log(tokenLogin, "tokenLogin");
  if (!tokenLogin) {
    return res.status(200).send(ApiError.errorCode401());
  }
  try {
    const userInfo = jwt.verify(tokenLogin, config.jwt.secretVikmoney);
    console.log(userInfo, "userInfo");
    if (userInfo && userInfo.sub?.user_id) {
      const dataUser = await userService.getUserById(userInfo.sub?.user_id);
      if (!dataUser) {
        console.log("dataUser", dataUser);
        return res.status(200).send(ApiError.errorCode101());
      }
      if (!dataUser.status) {
        return res.status(200).send(ApiError.errorCode102());
      }
      req.user = userInfo.sub;
      next();
    } else {
      return res.status(200).send(ApiError.errorCode401());
    }
  } catch (error) {
    console.log(error);
    return res.status(200).send(ApiError.errorCode401());
  }
};

module.exports = { verifyToken, verifyTokenSendMail };
