import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN Stack Book Shop 🚀");
});

// Routes
app.use("/books", booksRoute);

// MongoDB + Server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("✅ App connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
