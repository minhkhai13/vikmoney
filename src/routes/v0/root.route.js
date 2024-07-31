const express = require("express");
const validate = require("../../middlewares/validate");
const verifyTokenTraffic = require("../../middlewares/verifyTokenTraffic");
const verifyRole = require("../../middlewares/verifyRole");
const passport = require("passport");
const rootController = require("../../controllers/trafficuser/root.traffic.controller");
const rootValidate = require("../../validate/trafficuser/root.validate");

const router = express.Router();

router.post(
  "/insert-user-mail",
  validate(rootValidate.insertUserMail),
  verifyTokenTraffic.verifyToken,
  verifyRole("root"),
  rootController.insertUserMail
);
router.post(
  "/active-mail",
  verifyTokenTraffic.verifyToken,
  verifyRole("root"),
  rootController.activeMail
);
router.post(
  "/update-infor-user-mail",
  validate(rootValidate.updateInforUser),
  verifyTokenTraffic.verifyToken,
  verifyRole("root"),
  rootController.updateInforUser
);

module.exports = router;
