const express = require("express");
const passportConfig = require("./config/passport");
const bodyParser = require("body-parser");
const configCors = require("./config/cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const routes = require("./routes");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const configLoginWithGoogle = require("./config/loginGoogle");
dotenv.config();
const configSession = require("./config/session");
const requestIp = require("request-ip");
const getDataDeviceUser = require("./middlewares/getDataDeviceUser");

const app = express();
// connectDB();

app.use(requestIp.mw());
app.use(configCors);

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
configSession(app);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
// parse urlencoded request body
app.use(getDataDeviceUser);
app.use("/api", routes);
app.use("/login", function (req, res) {
  res.send("login");
});

// Routes
passportConfig();
configLoginWithGoogle();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "https://192.168.1.219";
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});
