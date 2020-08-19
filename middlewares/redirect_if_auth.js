const passport = require("passport");

const redirectIfAuth = (req, res, next) => {
  passport.authenticate("jwt-cookiecombo", (err, user, info) => {
    if (!user) {
      next();
    } else {
      res.redirect("/openings");
    }
  })(req, res, next);
};

module.exports = { redirectIfAuth };
