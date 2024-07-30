const requestIp = require('request-ip');
const UAParser = require('ua-parser-js');

const getDataDeviceUser = (req, res, next) => {
  // Sử dụng thư viện request-ip để lấy địa chỉ IP từ yêu cầu
  const ip = requestIp.getClientIp(req) || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
  const ua = req.headers["user-agent"];
  const parser = new UAParser();
  const parsedUa = parser.setUA(ua).getResult();
  
  const browserName = parsedUa.browser.name;
  const browserVersion = parsedUa.browser.version;
  const osName = parsedUa.os.name;
  const osVersion = parsedUa.os.version;
  const deviceType = parsedUa.device.type || "Unknown";
  
  req.deviceInfo = {
    browserName,
    browserVersion,
    osName,
    osVersion,
    deviceType,
    ip,
  };
  
  console.log(req.deviceInfo);
  next();
};

module.exports = getDataDeviceUser;
