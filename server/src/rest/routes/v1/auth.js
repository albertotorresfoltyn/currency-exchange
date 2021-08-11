const express = require("express");

const asyncHandler = require("../../middlewares/async-handler");
const { login } = require("../../../controllers/auth");

const router = express.Router();

router.post(
  "/login",
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const data = await login(req.body);
    res.send({ data });
  })
);

module.exports = router;
