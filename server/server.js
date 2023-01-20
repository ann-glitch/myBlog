const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

const app = express();
const port = 5000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//cookie-parser
app.use(cookieParser());

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect mongo
connectDB();

//route files
const users = require("./routes/users");

//mount routers
app.use("/api/v1/auth", users);

//error handler middleware
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`server running on port ${port}`.cyan);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`MongoServerError: ${err.message}`.red);

  //close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
