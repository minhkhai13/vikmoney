const express = require("express");
const session = require("express-session");
const passportConfig = require("./config/passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const configCors = require("./config/cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./database/config/connectDB");
const routes = require("./routes");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const configLoginWithGoogle = require("./config/loginGoogle");
dotenv.config();
const configSession = require("./config/session");

const app = express();
// connectDB();


// Middleware

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
configSession(app);
const corsOptions = {
  origin: process.env.HOST_FE, // Chỉ cho phép yêu cầu từ localhost:8000
  optionsSuccessStatus: 200 // Một số trình duyệt cũ sẽ cần tùy chọn này để hoạt động
};
app.use(cors(corsOptions));
app.use(configCors);
app.use(morgan("dev"));

app.use(passport.initialize());
app.use(passport.session());
// parse urlencoded request body

app.use("/api", routes);
app.use("/login",function(req,res){
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
