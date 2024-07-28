const passport = require("passport");
const LocalStrategy = require("passport-local");
const authServiceTraffic = require("../services/trafficuser/auth.traffic.service");
const authServiceVikmoney = require("../services/vikmoney/auth.vikmoney.service");


const configPassport = () => {
  passport.use('login-traffic-user',
    new LocalStrategy( async function verify(username, password, cb) {
      const result = await authServiceTraffic.loginUserWithEmailAndPassword(
        username,
        password
      );
      return cb(null, result);
    })
  );
  passport.use('login-vikmoney',
    new LocalStrategy( async function verify(username, password, cb) {
      const result = await authServiceVikmoney.loginUserWithEmailAndPassword(
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
