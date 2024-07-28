const express = require("express");
const router = express.Router();
const v0Router = require("./v0/index");
const v1Router = require("./v1/index");

const defaultRouter = [
  {
    path: "/v0",
    router: v0Router,
  },
  {
    path: "/v1",
    router: v0Router,
  },
];

defaultRouter.forEach((route) => {
  router.use(route.path, route.router);
});
module.exports = router;
