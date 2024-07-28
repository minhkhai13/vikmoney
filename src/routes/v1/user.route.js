const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validate/vikmoney/user.validate");
const userController = require("../../controllers/vikmoney/user.vikmoney.controller");
const verifyToken = require("../../middlewares/verifyTokenVikmoney");
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

module.exports = router;
