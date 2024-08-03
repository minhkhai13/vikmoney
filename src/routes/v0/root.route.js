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
  "/unactive-mail",
  verifyTokenTraffic.verifyToken,
  verifyRole("root"),
  rootController.unActiveMail
);
router.post(
  "/update-infor-user-mail",
  validate(rootValidate.updateInforUser),
  verifyTokenTraffic.verifyToken,
  verifyRole("root"),
  rootController.updateInforUser
);

router.post(
  "/recharge-user",
  validate(rootValidate.rechargeUser),
  verifyTokenTraffic.verifyToken,
  verifyRole("root"),
  rootController.rechargeUser
);

router.post(
  "/delete-user",
  validate(rootValidate.deleteUsers),
  verifyTokenTraffic.verifyToken,
  verifyRole("root"),
  rootController.deleteUser
);

router.post(
  "/unblock-user",
  validate(rootValidate.unBlockUser),
  verifyTokenTraffic.verifyToken,
  verifyRole("root"),
  rootController.unBlockUser
);
router.post(
  "/get-info-user",
  validate(rootValidate.getInfoUser),
  verifyTokenTraffic.verifyToken,
  verifyRole("root"),
  rootController.getInfoUser
);

module.exports = router;
