const { Router } = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const authController = require("../controllers/authController");
const { redirectIfAuth } = require("../middlewares/redirect_if_auth");

const router = Router();

router.get("/signup", redirectIfAuth, authController.signupGet);
router.post("/signup", authController.signupPost);

router.get("/signin", redirectIfAuth, authController.signinGet);

router.post(
  "/signin",
  bodyParser.urlencoded({ extended: false }),
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  authController.signinPost
);

router.get("/signout", (req, res) => {
  req.logOut();
  res.cookie("jwt", "", { maxAge: 0 });
  res.redirect("/signin");
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, __dirname + "/../uploads");
  },
  filename(req, file, cb) {
    const fileName = `resume-${req.user.id}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});
const upload = multer({ dest: "/uploads", storage });

router.post(
  "/resume/upload",
  passport.authenticate("jwt-cookiecombo"),
  upload.single("resume"),
  authController.resumeUpload
);

module.exports = router;
