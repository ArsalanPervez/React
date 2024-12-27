import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import todoRoutes from "./routes/index.js";

dotenv.config();
const app = express();

// Use the port provided by Vercel
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
app.use("/api/v1", todoRoutes);
// MongoDB Connection and Server Initialization
(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed: ", err);
    process.exit(1); // Exit the process on failure
  }
})();
