const login = async (req, res) => {
  res.send("login");
}

const logout = async (req, res) => {
  res.send("logout");
}

const active = async (req, res) => {
  res.send("active");
}

const verifyEmail = async (req, res) => {
  res.send("verifyEmail");
}

const refreshTokens = async (req, res) => {
  res.send("refreshTokens");
}

const forgotPassword = async (req, res) => {
  res.send("forgotPassword");
}

const resetPassword = async (req, res) => {
  res.send("resetPassword");
}

const sendVerificationEmail = async (req, res) => {
  res.send("sendVerificationEmail");
}

const googleAuthentication = async (req, res) => {
  res.send("googleAuthentication");
}

const googleAuthenticationCallBack = async (req, res) => {
  res.send("googleAuthenticationCallBack");
}

const facebookAuthentication = async (req, res) => {
  res.send("facebookAuthentication");
}

const facebookAuthenticationCallBack = async (req, res) => {
  res.send("facebookAuthenticationCallBack");
}

const register = async (req, res) => {
  res.send("register");
}

module.exports = {
  login,
  logout,
  active,
  verifyEmail,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  googleAuthentication,
  googleAuthenticationCallBack,
  facebookAuthentication,
  facebookAuthenticationCallBack,
  register
}
