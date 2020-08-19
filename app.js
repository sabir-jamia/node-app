const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const methodOverride = require("method-override");

require("./auth");
const config = require("./config");
const openingRoutes = require("./routes/openingRoutes");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

app.set("view engine", "ejs");
app.use(cookieParser(config.jwt.secret));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

const dbUri =
  "mongodb+srv://test:test@321@cluster0.fjyvz.mongodb.net/node-app?retryWrites=true&w=majority";
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(8080, () => {
      console.log("app is listening on port 8080");
    })
  );

app.use(authRoutes);

app.use(
  "/openings",
  methodOverride("_method"),
  passport.authenticate("jwt-cookiecombo"),
  openingRoutes
);

app.use(
  "/applications",
  passport.authenticate("jwt-cookiecombo"),
  applicationRoutes
);
