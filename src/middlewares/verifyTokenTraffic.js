const config = require("../config/config");
const jwt = require("jsonwebtoken");
const userService = require("../services/trafficuser/users.traffic.service");
const ApiError = require("../utils/apiError");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //check start with Bearer?

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(200).send(ApiError.errorCode401());
  }

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(200).send(ApiError.errorCode401());
  }
  try {
    const userInfo = jwt.verify(token, config.jwt.secretTrafic);
    if (userInfo && userInfo.sub?.user_id && userInfo.sub?.user_name) {
      const dataUser = await userService.getUserById(userInfo.sub?.user_id);
      if (!dataUser) {
        return res.status(200).send(ApiError.errorCode101());
      }
      if (!dataUser.status) {
        return res.status(200).send(ApiError.errorCode102());
      }
      if (!dataUser.active) {
        return res.status(200).send(ApiError.errorCode100());
      }
      if(dataUser.role != userInfo.sub?.role){
        return res.status(200).send(ApiError.errorCode10("Role not match with token. Please login again"));
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
    return res.status(401).send(ApiError.errorCode401());
  }
  try {
    const userInfo = jwt.verify(tokenLogin, config.jwt.secretTrafic);
    console.log(userInfo, "userInfo");
    if (userInfo && userInfo.sub?.user_id) {
      const dataUser = await userService.getUserById(userInfo.sub?.user_id);
      if (!dataUser) {
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
