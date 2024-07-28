const passport = require("passport");
const catchAsync = require("../../utils/catchAsync");
const authService = require("../../services/trafficuser/auth.traffic.service");
const config = require("../../config/config");
const tokenService = require("../../services/trafficuser/token.traffic.service");
const emailService = require("../../services/trafficuser/email.traffic.service");


