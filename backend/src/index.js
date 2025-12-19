import express from "express";
import { connectDB } from "./db/index.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
