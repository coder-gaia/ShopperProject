"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const conn = require("./config/db");
const app = express();
if (!process.env.API_URL) {
    throw new Error('API_URL environment variable is not defined');
}
app.use(express.json());
const measureRoutes_1 = __importDefault(require("./routes/measureRoutes"));
conn()
    .then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
})
    .catch((error) => {
    console.error("Failed to connect to the database:", error);
});
const router = require("./routes/Routes.ts");
app.use('/api/measures', measureRoutes_1.default);
app.use(router);
