const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtCookieComboStrategy = require("passport-jwt-cookiecombo").Strategy;

const User = require("./models/User");
const config = require("./config");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.signin(username, password);
        return done(null, {
          id: user._id,
          role: user.role,
          username: user.username,
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JwtCookieComboStrategy(
    {
      secretOrPublicKey: config.jwt.secret,
      jwtVerifyOptions: config.jwt.options,
      passReqToCallback: false,
    },
    (payload, done) => {
      return done(null, payload.user, {});
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
