const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validate/trafficuser/user.validate");
const userController = require("../../controllers/trafficuser/user.traffic.controller");
const verifyToken = require("../../middlewares/verifyTokenTraffic");
const verifyRole = require("../../middlewares/verifyRole");
const passport = require("passport");

const router = express.Router();

router.get("/get-infor", verifyToken.verifyToken, userController.getInfor);
router.post(
  "/update-infor-login-email",
  validate(userValidation.updateInforLoginEmail),
  verifyToken.verifyToken,
  userController.updateInforLoginEmail
);

router.get(
  "/get-all-user",
  validate(userValidation.getAllUser),
  verifyToken.verifyToken,
  verifyRole("root"),
  userController.getAllUser
);

router.post(
  "/block-user",
  validate(userValidation.blockUser),
  verifyToken.verifyToken,
  verifyRole("root"),
  userController.blockUser
);

router.post(
  "/update-role-users",
  validate(userValidation.updateRoleUsers),
  verifyToken.verifyToken,
  verifyRole("root"),
  userController.updateRoleUsers
);

router.post(
  "/update-dack-mode-laguage",
  validate(userValidation.updateDackModeLaguage),
  verifyToken.verifyToken,
  userController.updateDackModeLaguage
);

module.exports = router;
