const dotenv = require("dotenv");
const userServices = require("../services/trafficuser/users.traffic.service");
dotenv.config();

const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const configLoginWithGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        let user = await userServices.getUserByEmail(profile.emails[0].value);

        if (user) {
          return cb(null, user);
        } else {
          user = await userServices.createUserMail(
            profile.displayName,
            profile.emails[0].value
          );
          console.log("user", user);
        }
        return cb(null, profile);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
      }
    )
  );
};

module.exports = configLoginWithGoogle;
