import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["https://your-client-app.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.get("/hello", (req, res) => {
  res.json("hello");
});

mongoose.connect(
  process.env.MONGODB_URI || "your-default-mongodb-uri"
);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
