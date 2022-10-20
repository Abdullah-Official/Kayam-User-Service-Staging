const express = require("express");
const auth = require("./auth");
const user = require("./user");
const coach = require("./coach");
const userProfile = require("./user-profiles");
const router = express.Router();
const { authMiddleware } = require("../middlewares/index");

router.use("/auth", auth);
router.use("/user", authMiddleware, user);
router.use("/coach", coach);
router.use("/user-profile", authMiddleware, userProfile);

module.exports = router;
