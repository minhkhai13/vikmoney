const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validate/auth.validate");
const authController = require("../../controllers/trafficuser/auth.traffic.controller");
const verifyToken = require("../../middlewares/verifyTokenTraffic");
const passport = require("passport");

const router = express.Router();