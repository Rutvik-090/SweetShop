import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import sweetRouter from "./routes/sweetRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

connectDB();

app.get("/test", (req, res) => {
  res.send("Running...");
});

app.use("/sweets", sweetRouter);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
