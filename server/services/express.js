"use strict";

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("../routes");
const port = process.env.PORT || 3005
const cors = require('cors');

// Create server
const app = express();
const server = require("http").Server(app);

// Habdle cors
app.use(cors({
    origin: 'http://localhost:3000' 
  }));

// Parse json bodies
app.use(bodyParser.json());



// router
app.use("/api", apiRouter);




exports.start = () => {
  server.listen(port, (err) => {
    if (err) {
      console.log(`Error : ${err}`);
      process.exit(-1);
    }

    console.log(`Server is running on ${port}`);

  });

};

exports.app = app;
