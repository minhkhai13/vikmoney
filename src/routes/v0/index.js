const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const userRouter = require("./user.route"); // Sửa lỗi chính tả từ 'userRoter' thành 'userRouter'
const domainRouter = require("./domain.route");
const rootRouter = require("./root.route");
const campRouter = require("./camp.route");
const defaultRouter = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/user",
    router: userRouter, // Sửa lỗi chính tả từ 'userRoter' thành 'userRouter'
  },
  {
    path: "/domain",
    router: domainRouter,
  },
  {
    path: "/root",
    router: rootRouter,
  },
  {
    path:"/camp",
    router: campRouter,
  }
];

defaultRouter.forEach((route) => {
  router.use(route.path, route.router);
});

module.exports = router;
