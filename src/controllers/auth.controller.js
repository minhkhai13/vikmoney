const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");
const config = require("../config/config");
const tokenService = require("../services/token.service");
const emailService = require("../services/email.service");
const login = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("http://localhost:3000/");
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res);
};

const logout = async (req, res) => {
  req.session.destroy();
  res.send("logout");
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userInfo = req.user;
  const result = await authService.updatePassword(oldPassword, newPassword, userInfo);
  res.status(200).send(result);
}
const active = async (req, res) => {
  res.send("active");
};

const verifyEmail = catchAsync(async (req, res) => {
  const result = await authService.verifyEmail(req.query.token);
  res.send(result);
});

const refreshTokens = async (req, res) => {
  res.send("refreshTokens");
};

const forgotPasswordMail = async (req, res) => {
  const emailForgot = req.body.email;
  const result = await authService.forgotPasswordMail(emailForgot);

  res.status(200).send(result);
};

const resetPassword = async (req, res) => {
  const token = req.query.token;
  const password = req.body.password;
  const result = await authService.resetPassword(token, password);
  res.status(200).send(result);
};

const sendVerificationEmail = async (req, res) => {
  const user = req.user;
  const email = user.email;
  const tokenVerifyMail = await tokenService.generateAuthTokensVerifyEmail(
    user
  );
  const result = await emailService.sendVerificationEmail(
    email,
    tokenVerifyMail
  );
  res.status(200).send(result);
};

const googleAuthenticationCallBack = catchAsync(async (req, res) => {
  const result = await emailService.googleAuthenticationCallBack(
    req.user,
    req.query.redirectUrl
  );
  res.redirect(result);
});

const facebookAuthentication = async (req, res) => {
  res.send("facebookAuthentication");
};

const facebookAuthenticationCallBack = async (req, res) => {
  res.send("facebookAuthenticationCallBack");
};

const register = async (req, res) => {
  const { username, password, fullName } = req.body;
  console.log(username, password, fullName);
  const user = await authService.register(fullName, username, password);
  res.send(user);
};

module.exports = {
  login,
  logout,
  active,
  verifyEmail,
  refreshTokens,
  forgotPasswordMail,
  resetPassword,
  sendVerificationEmail,
  googleAuthenticationCallBack,
  facebookAuthentication,
  facebookAuthenticationCallBack,
  register,
  updatePassword,
};
