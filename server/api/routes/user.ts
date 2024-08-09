import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from '../models/user';
import { UserErrors } from '../errors';
import multer from 'multer';
import path from 'path';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/  ');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage });


const router = express.Router();



router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ type: UserErrors.EMAIL_ALREADY_EXISTS });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user: IUser = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get("/available-money/:userID", verifyToken, async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.findById(userID);
    if (!user) {
      res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    res.json({ availableMoney: user.availableMoney });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post('/upload-profile-image', upload.single('image'), async (req, res) => {
console.log(req.body);
res.send("uploaded")
});

export { router as userRouter };
 