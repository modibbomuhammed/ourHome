var express = require("express");
var router = express.Router();
var Home = require("../models/home");
var Agent = require("../models/agent");
var passport = require("passport");
var multer = require("multer");
const {
  getHomes,
  newHome,
  createHome,
  showHome,
  editHome,
  updateHome,
  deleteHome,
} = require("../controllers/home");
const { cloudinary, storage } = require("../cloudinary");

const upload = multer({ storage }).array("pictures", 10);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index/index", { title: "Home" });
});

// GET REGISTER PAGE
router.get("/register", (req, res, next) => {
  res.render("index/register", { title: "Registration" });
});

// POST REGISTER PAGE
router.post("/register", async (req, res, next) => {
  const { username, email } = req.body;
  const agent = new Agent({
    username,
    email,
  });
  
  const newAgent = await Agent.register(agent, req.body.password);
  passport.authenticate("local")(req, res, () => {
    res.redirect("/homes");
  });
});

// GET LOGIN PAGE
router.get("/login", (req, res, next) => {
  res.render("index/login", { title: "Login" });
});

// POST LOGIN FORM
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    // failureFlash: true,
    // successFlash: 'Welcome Back!!'
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
