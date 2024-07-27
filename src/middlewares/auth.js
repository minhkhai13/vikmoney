const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/APIError");

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;
    if (requiredRights.length) {
      const userRights = user.roles.reduce(
        (arr, r) => [...arr, ...r.authorities.map((a) => a.name)],
        []
      );
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

const isLogin = (req, res, next) => {
  console.log(req.isAuthenticated(), "req.isAuthenticated()");
  if (req.isAuthenticated()) {
    if(req.path === "/login") {
      return res.redirect("/");
    }
    return next();
  }
  res.redirect("/login");
};
const isNotLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

module.exports = { auth, isLogin, isNotLogin };
