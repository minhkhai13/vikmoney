const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validate/auth.validate");
const userController = require("../../controllers/trafficuser/user.traffic.controller");
const verifyToken = require("../../middlewares/verifyTokenTraffic");
const passport = require("passport");

const router = express.Router();

router.get("/get-infor", verifyToken.verifyToken, userController.getInfor);
router.post(
  "/update-infor-login-email",
  verifyToken.verifyToken,
  userController.updateInforLoginEmail
);

module.exports = router;
