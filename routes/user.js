const { Router } = require("express");
const User = require("../models/user");
const { createHmac, randomBytes } = require("crypto");
const { generateToken } = require("../service/auth");

const router = Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("signin", { err: "Incorrect email or password" });
    }
    const hashPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    if (hashPassword !== user.password) {
      return res.render("signin", { err: "Incorrect email or password" });
    }
    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    return res.render("signin", { err: "Incorrect email or password" });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  res.redirect("/signin");
});

module.exports = router;
