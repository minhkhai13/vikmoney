const db = require("../../database/models/index");
const ApiError = require("../../utils/apiError");
const config = require("../../config/config");
const uuiv4 = require("uuid");
const axios = require("axios");

const logHistory = async (userId,type, info, device, ip, volatility = "") => {
  try {
    const data = {
      user_id: userId,
      type: type,
      info: info,
      device: device,
      ip: ip,
      volatility: volatility,
    };
    const result = await db.HistoryTraffic.create(data);
    
  } catch (error) {
    console.log(error);
    // return ApiError.errorCode600(error);
  }
};



module.exports = { logHistory };