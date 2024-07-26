const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");
const config = require("../config/config");
const tokenService = require("../services/token.service");
const emailService = require("../services/email.service");
const login = async (req, res) => {
  console.log(req.isAuthenticated(), "req.isAuthenticated()");
  if(req.isAuthenticated ()){
    return res.redirect('http://localhost:3000/');
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

const active = async (req, res) => {
  res.send("active");
};

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.send(verifyEmail);
});

const refreshTokens = async (req, res) => {
  res.send("refreshTokens");
};

const forgotPassword = async (req, res) => {
  res.send("forgotPassword");
};

const resetPassword = async (req, res) => {
  res.send("resetPassword");
};

const sendVerificationEmail = async (req, res) => {
  const user  = req.user;
  console.log(user, "user");
  const email = user.email;
  const tokenVerifyMail = await tokenService.generateAuthTokensVerifyEmail(user);
  console.log(tokenVerifyMail, "tokenVerifyMail");
  const result = await emailService.sendVerificationEmail(
    email,
    tokenVerifyMail
  );
  res.send(result);
};

const googleAuthenticationCallBack = catchAsync(async (req, res) => {
  console.log(req.query, "req.query");
  const result = await emailService.googleAuthenticationCallBack(
    req.user,
    req.query.redirectUrl
  );
  console.log(result, "result");
  res.redirect(result);
});

const facebookAuthentication = async (req, res) => {
  res.send("facebookAuthentication");
};

const facebookAuthenticationCallBack = async (req, res) => {
  res.send("facebookAuthenticationCallBack");
};

const register = async (req, res) => {
  const { email, password, fullName } = req.body;
  console.log(email, password, fullName);
  const user = await authService.register(fullName, email, password);

  res.send(user);
};

module.exports = {
  login,
  logout,
  active,
  verifyEmail,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  googleAuthenticationCallBack,
  facebookAuthentication,
  facebookAuthenticationCallBack,
  register,
};
