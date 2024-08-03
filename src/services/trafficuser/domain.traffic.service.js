const db = require("../../database/models/index");
const ApiError = require("../../utils/apiError");
const uuiv4 = require("uuid");
const axios = require("axios");

const setUpDomain = async (domain, nameDomain, detailDomain, userID) => {
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
      script_id: domainCode,
      name: nameDomain,
      detail_info: detailDomain,
    });
    if (result) {
      const data = {
        code: result.script_id,
        domain: result.domain,
        status: result.status,
        domainName: result.name,
        domainInfo: result.detail_info,
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
      attributes: ["domain", "status", "script_id", "name", "detail_info"],
    });
    if (!result) {
      return ApiError.errorCode600("Get all domain fail");
    }
    // Định dạng lại dữ liệu
    const formattedResult = result.map((item) => ({
      domain: item.domain,
      status: item.status,
      code: item.script_id, // "code" từ "script_id"
      domainName: item.name,
      domainInfo: item.detail_info, // "domainInfo" từ "detail_info"
    }));
    return ApiError.errorCode200("Get all domain success", formattedResult);
  } catch (error) {
    return ApiError.errorCode600(error);
  }
};

const verifyDomain = async (domain, userID) => {
  try {
    const isDomainExist = await getDomain(domain, userID);
    if (isDomainExist.errorcode !== 200) {
      return isDomainExist;
    }
    if (!isDomainExist.data?.script_id) {
      return ApiError.errorCode600("Domain chưa được thêm vào hệ thống");
    }

    const checkScriptResult = await checkScript(
      isDomainExist.data.script_id,
      domain
    );
    console.log(checkScriptResult);
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

const checkScript = async (scriptId, url) => {
  try {
    url = url.includes("https://") ? url : `https://${url}`;
    const response = await axios.get(url);
    if (
      response.status === 200 &&
      response.data.includes(
        `<script src="https://web1s.com/site-u-v5.js?id=${scriptId}"></script>`
      )
    ) {
      return ApiError.errorCode200("Script của bạn đã được thêm vào!");
    } else {
      return ApiError.errorCode600("Script của bạn chưa được thêm vào!");
    }
  } catch (error) {
    console.error(error);
    return ApiError.errorCode600(error.message);
  }
};

const checkDomain = async (domain, userID) => {
  try {
    console.log(domain, userID);
    const isDomainExist = await db.DomainTraffic.findOne({
      where: {
        domain: domain,
        user_id: userID,
      },
    });
    if (isDomainExist) {
      return ApiError.errorCode601();
    }
    return ApiError.errorCode200("Ok", isDomainExist);
  } catch (error) {
    return ApiError.errorCode600(error);
  }
};

const getDomain = async (domain, userID) => {
  try {
    console.log(domain, userID);
    const dataDomain = await db.DomainTraffic.findOne({
      where: {
        domain: domain,
        user_id: userID,
      },
    });
    if (!dataDomain) {
      return ApiError.errorCode601();
    }
    return ApiError.errorCode200("Ok", dataDomain);
  } catch (error) {
    return ApiError.errorCode600(error);
  }
};
module.exports = { setUpDomain, getAllDomain, verifyDomain };
