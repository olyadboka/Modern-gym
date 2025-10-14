import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

import { DbConnection } from "./configs/dbconnection.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
  DbConnection();
});
