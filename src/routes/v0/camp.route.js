const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const campaignController = require("../../controllers/trafficuser/camp.traffic.controller");
const campaignValidation = require("../../validate/trafficuser/campaign.validate");
const verifyTokenTraffic = require("../../middlewares/verifyTokenTraffic");

router.post(
  "/create-google-search",
  validate(campaignValidation.createGoogleSearch),
  verifyTokenTraffic.verifyToken,
  campaignController.createGoogleSearch
);

router.post(
  "/create-direct",
  validate(campaignValidation.createDirect),
  verifyTokenTraffic.verifyToken,
  campaignController.createDirect
);

router.post(
  "/create-click-backlink",
  validate(campaignValidation.createClickBacklink),
  verifyTokenTraffic.verifyToken,
  verifyTokenTraffic.verifyToken
);

module.exports = router;
