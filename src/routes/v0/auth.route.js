const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validate/auth.validate");
const authController = require("../../controllers/trafficuser/auth.traffic.controller");
const verifyToken = require("../../middlewares/verifyTokenTraffic");
const passport = require("passport");
const getDataDeviceUser = require("../../middlewares/getDataDeviceUser");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
});
// router.post("/login", validate(authValidation.login), authController.login);
router.post("/login", validate(authValidation.login), authController.login);

// router.post("/logout", validate(authValidation.logout), authController.logout);
router.post("/logout", authController.logout);
router.get("/active", validate(authValidation.active), authController.active);
router.post(
  "/update-password",
  validate(authValidation.updatePassword),
  verifyToken.verifyToken,
  authController.updatePassword
);

router.post(
  "/refresh-tokens",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

router.post(
  "/send-mail-forgot-password",
  validate(authValidation.forgotPasswordMail),
  authController.forgotPasswordMail
);
router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);

router.post(
  "/send-verification-email",
  verifyToken.verifyTokenSendMail,
  authController.sendVerificationEmail
);
router.post("/verify-email", authController.verifyEmail);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleAuthenticationCallBack
);
router.get(
  "/facebook",
  validate(authValidation.facebookAuthentication),
  authController.facebookAuthentication
);
router.get(
  "/facebook/callback",
  validate(authValidation.facebookAuthenticationCallBack),
  authController.facebookAuthenticationCallBack
);
router.post(
  "/register-with-mail",
  validate(authValidation.register),
  authController.registerWithMail
);
module.exports = router;
