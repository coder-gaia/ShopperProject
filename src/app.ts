require("dotenv").config();

const express = require("express");
const conn = require("./config/db");

const app = express();

conn()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error: any) => {
    console.error("Failed to connect to the database:", error);
  });
