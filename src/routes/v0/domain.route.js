const express = require("express");
const validate = require("../../middlewares/validate");
const domainController = require("../../controllers/trafficuser/domain.traffic.controller");
const domainValidation = require("../../validate/trafficuser/domain.validate");
const verifyToken = require("../../middlewares/verifyTokenTraffic");
const passport = require("passport");

const router = express.Router();

router.post(
  "/set-up-domain",
  validate(domainValidation.setUpDomain),
  verifyToken.verifyToken,
  domainController.setUpDomain
);

router.post(
  "/get-all-domain",
  validate(domainValidation.getAllDomain),
  verifyToken.verifyToken,
  domainController.getAllDomain
);

router.post(
  "/verify-domain",
  validate(domainValidation.verifyDomain),
  verifyToken.verifyToken,
  domainController.verifyDomain
);

module.exports = router;
