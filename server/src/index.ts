import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const app = express();

app.use(cors({
  origin: ["https://nealphi-server.vercel.app"],
  methods: ["POST","GET"],
  credentials: true
}))

app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.get("/hello", (req, res) => {
  res.json("hello");
});

mongoose.connect(
  "mongodb+srv://neginalipanahi:N1e-g2i%2Fn1368@ecommerce.v1fle7p.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce"
);
app.listen(3001, () => console.log("Server started"));
