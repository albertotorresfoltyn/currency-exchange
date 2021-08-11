const express = require("express");

const asyncHandler = require("../../middlewares/async-handler");
const {
  get,
  getById,
  create,
  update,
  deleteById,
} = require("../../../controllers/users");

const router = express.Router();

router.get(
  "/",
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const users = await get();
    res.send({ users });
  })
);

router.get(
  "/:id",
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const user = await getById(req.params.id);
    res.send({ user });
  })
);

router.post(
  "/",
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const user = await create(req.body);
    res.send({ user });
  })
);

router.patch(
  "/:id",
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const user = await update(req.params.id, req.body);
    res.send({ user });
  })
);

router.delete(
  "/:id",
  // eslint-disable-next-line no-unused-vars
  asyncHandler(async (req, res, next) => {
    const user = await deleteById(req.params.id);
    res.send({ user });
  })
);

module.exports = router;
