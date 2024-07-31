const db = require("../../database/models/index");
const ApiError = require("../../utils/apiError");
const config = require("../../config/config");
const uuiv4 = require("uuid");
const axios = require("axios");

const logHistory = async (userId,type,browser_name ,info=null, device, ip,status_code, volatility = 0) => {
  try {
    const data = {
      user_id: userId,
      type: type,
      info: info,
      device: device,
      ip: ip,
      browser_name: browser_name,
      status_code: status_code,
      volatility: volatility,
    };
    console.log(data);
    const result = await db.HistoryActiveTraffic.create(data);
    
  } catch (error) {
    console.log(error);
    // return ApiError.errorCode600(error);
  }
};



module.exports = { logHistory };