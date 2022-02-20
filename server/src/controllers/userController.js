import User from '../models/User.js';
import bcrypt from 'bcrypt';
import ApiError from '../middlewares/ApiError.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    next(ApiError.BAD_REQUEST('Please provide all the credentials.'));

    return;
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    next(ApiError.BAD_REQUEST('User already exists.'));

    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json({
    message: 'User successfully created.',
    user: { _id: user._id, name: user.name, email: user.email }
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    res.status(201).json({
      message: 'Successfully logged in.',
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        token: generateToken(existingUser._id)
      }
    });
  } else {
    next(ApiError.UNAUTHORIZED('Invalid credentials.'));
  }
};

export const getMe = async (req, res, next) => {
  res
    .status(200)
    .json({ message: 'User fetched successfuly.', user: req.user });
};
