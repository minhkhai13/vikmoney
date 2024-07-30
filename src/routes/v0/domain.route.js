const express = require("express");
const validate = require("../../middlewares/validate");
const domainController = require("../../controllers/trafficuser/domain.traffic.controller");
const verifyToken = require("../../middlewares/verifyTokenTraffic");
const passport = require("passport");

const router = express.Router();

router.post(
  "/set-up-domain",
  verifyToken.verifyToken,
  domainController.setUpDomain
);

router.post(
  "/get-all-domain",
  verifyToken.verifyToken,
  domainController.getAllDomain
);

router.post("/verify-domain",verifyToken.verifyToken, domainController.verifyDomain);

module.exports = router;

