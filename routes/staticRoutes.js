const { Router } = require("express");
const Blog = require("../models/blog");
const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/logOut", (req, res) => {
  res.clearCookie("token").redirect("/signin");
});

router.get("/addBlog", (req, res) => {
  res.render("addBlog", { user: req.user });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", { user: req.user, blogs: allBlogs });
});

module.exports = router;
