const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./database/config/connectDB");
const routes = require('./routes')

dotenv.config();

const app = express();
connectDB();
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

// Routes


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
