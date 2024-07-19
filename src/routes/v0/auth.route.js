const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validate/auth.validate");
const authController = require("../../controllers/auth.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", validate(authValidation.logout), authController.logout);
router.get("/active", validate(authValidation.active), authController.active);
router.post(
  "/refresh-tokens",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);
router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);
router.post(
  "/send-verification-email",
  auth(),
  authController.sendVerificationEmail
);
router.post(
  "/verify-email",
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);
router.get(
  "/google",
  validate(authValidation.googleAuthentication),
  authController.googleAuthentication
);
router.get(
  "/google/callback",
  validate(authValidation.googleAuthenticationCallBack),
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
  "/register",
  validate(authValidation.register),
  authController.register
);
module.exports = router;
