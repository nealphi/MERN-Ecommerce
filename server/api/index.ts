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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve(__dirname, 'public/Images');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit, adjust as needed
});


app.post('/upload', upload.single('file'),async (req, res) => {
  try {
    if (!req.file) {
      console.error('No file uploaded.');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('File upload successful:', req.file);
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


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
