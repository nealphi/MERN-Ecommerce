import express from 'express';
import mongoose from 'mongoose';
import { userRouter } from './routes/user';
import { productRouter } from './routes/product';
import path from 'path';
import multer from 'multer';

const cors = require('cors');

const app = express();


// Use CORS middleware
app.use(cors({
  // origin: 'https://mern-ecommerce-client-ecru.vercel.app',
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());


app.use('/user', userRouter);
app.use('/product', productRouter);
app.get('/hello', (req, res) => {
  res.json('hello');
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://neginalipanahi:N1e-g2i%2Fn1368@ecommerce.v1fle7p.mongodb.net/ecommerce')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
