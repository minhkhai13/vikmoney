const passport = require("passport");
const LocalStrategy = require("passport-local");

const configPassport = () => {
  passport.use(new LocalStrategy(function verify(username, password, cb) {
    console.log(username, password);
    return cb(null, "row");
  }));
};

module.exports = configPassport;
