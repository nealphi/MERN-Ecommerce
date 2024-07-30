import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";
import dotenv from "dotenv";



const app = express();


// const corsOptions = {
//   origin: "http://localhost:3000/",
//   methods: ['POST', 'GET'],
//   credentials: true 
// };


app.use(express.json());
app.use(cors());



app.use("/user", userRouter);
app.use("/product", productRouter);
app.get("/hello", (req, res) => {
  res.json("hello");
});

mongoose.connect("mongodb+srv://neginalipanahi:N1e-g2i%2Fn1368@ecommerce.v1fle7p.mongodb.net/ecommerce");

app.listen( 3001, () => {
  console.log("server started");
});

// mongoose.connect(
//   "mongodb+srv://neginalipanahi:N1e-g2i%2Fn1368@ecommerce.v1fle7p.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce"
// );

// mongoose.connect(
//   "mongodb+srv://neginalipanahi:N1e-g2i%2Fn1368@ecommerce.v1fle7p.mongodb.net/ecommerce"
// );
// app.listen(3001, () => console.log("Server started"));
