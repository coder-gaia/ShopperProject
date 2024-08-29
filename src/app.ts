require("dotenv").config();
const express = require("express");
const conn = require("./config/db");

const app = express();


if (!process.env.API_URL) {
  throw new Error('API_URL environment variable is not defined');
}

app.use(express.json())

import measureRoutes from './routes/measureRoutes';

conn()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error: any) => {
    console.error("Failed to connect to the database:", error);
  });

const router = require("./routes/Routes.ts");

app.use('/api/measures', measureRoutes);

app.use(router);
