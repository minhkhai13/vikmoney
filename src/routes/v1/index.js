const express = require("express");
const router = express.Router();

const authRoter = require("./auth.route");
const userRouter = require("./user.route");

const defaultRouter = [
  {
    path: "/auth",
    router: authRoter,
  },
  {
    path: "/user",
    router: userRouter,
  },
];

defaultRouter.forEach((route) => {
  router.use(route.path, route.router);
});

module.exports = router;
