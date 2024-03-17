const express = require("express");
const body_parser = require("body-parser");
const userRouter = require("./routers/user.router")
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'https://fixitparts-9a290.web.app' 
  }));

app.use(body_parser.json());

app.use("/", userRouter);

module.exports = app;