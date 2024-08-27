const express = require("express");
const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@shoppercluster.kkx2q.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=shopperCluster`
    );
    console.log("Successfully connected to database!");

    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
