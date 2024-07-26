const passport = require("passport");
const LocalStrategy = require("passport-local");
const authService = require("../services/auth.service");

const configPassport = () => {
  passport.use(
    new LocalStrategy(async function verify(username, password, cb) {
      const result = await authService.loginUserWithEmailAndPassword(
        username,
        password
      );
      return cb(null, result);
    })
  );

  passport.serializeUser((user, done) => {
   return done(null, user);
  });
  passport.deserializeUser((id, done) => {
    return done(null, id);
  });
};

module.exports = configPassport;
