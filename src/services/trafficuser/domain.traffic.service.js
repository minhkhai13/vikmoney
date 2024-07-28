const db = require("../../database/models/index");
const ApiError = require("../../utils/apiError");
const uuiv4 = require("uuid");
const axios = require("axios");
const cheerio = require("cheerio");

const setUpDomain = async (domain, userID) => {
  try {
    const isDomainExist = await checkDomain(domain, userID);
    if (isDomainExist.errorcode !== 200) {
      return isDomainExist;
    }
    const domainCode = uuiv4.v4();
    const result = await db.DomainTraffic.create({
      domain: domain,
      user_id: userID,
      status: false,
      domain_code: domainCode,
    });
    if (result) {
      const data = {
        code: result.domain_code,
        domain: result.domain,
        status: result.status,
      };
      return ApiError.errorCode200("Create domain success", data);
    }
    return ApiError.errorCode600("Create domain fail");
  } catch (error) {
    console.log(error);
    if (error.errorcode) {
      return error;
    }
    return ApiError.errorCode600(error);
  }
};

const getAllDomain = async (userID) => {
  try {
    const result = await db.DomainTraffic.findAll({
      where: {
        user_id: userID,
      },
      attributes: ["domain", "status", "domain_code"],
    });
    if (!result) {
      return ApiError.errorCode600("Get all domain fail");
    }
    return ApiError.errorCode200("Get all domain success", result);
  } catch (error) {
    return ApiError.errorCode600(error);
  }
};

const verifyDomain = async (domain, userID) => {
  try {
    const isDomainExist = await checkDomain(domain, userID);
    if (isDomainExist.errorcode !== 200) {
      return isDomainExist;
    }

    const checkScriptResult = await checkScript("script",domain);
    if (checkScriptResult.errorcode !== 200) {
      return checkScriptResult;
    }
    const result = await db.DomainTraffic.update(
      {
        status: true,
      },
      {
        where: {
          domain: domain,
          user_id: userID,
        },
      }
    );
    if (result) {
      return ApiError.errorCode200("Verify domain success");
    }
    return ApiError.errorCode600("Verify domain fail");
  } catch (error) {
    return ApiError.errorCode600(error);
  }
};

const checkScript = async (script, url) => {
  try {
    // Gửi yêu cầu GET đến trang web A
    const response = await axios.get(url);
    const html = response.data;

    // Phân tích HTML
    const $ = cheerio.load(html);
    const divExists =
      $('#beelink-campaign-key[data-key="4bLt8a"][data-type="element"]')
        .length > 0;
    const scriptExists =
      $('script[src="https://beelink.app/assets/js/site.js"]').length > 0;

    if (divExists && scriptExists) {
      return ApiError.errorCode200("Script của bạn đã được thêm vào!");
    } else if (divExists) {
      return ApiError.errorCode600("Script của bạn chưa được thêm vào!");
    }
  } catch (error) {
    console.error(error);
    return ApiError.errorCode600(error);
  }
};

const checkDomain = async (domain, userID) => {
  try {
    const isDomainExist = await db.DomainTraffic.findOne({
      where: {
        domain: domain,
        user_id: userID,
      },
    });
    if (isDomainExist) {
      return ApiError.errorCode601();
    }
    return ApiError.errorCode200(isDomainExist);
  } catch (error) {
    return ApiError.errorCode600(error);
  }
};
module.exports = { setUpDomain, getAllDomain, verifyDomain };
