const express = require("express");
const usersRoutes = require("./users");
const authRoutes = require("./auth");

const router = express.Router();
router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

module.exports = router;
