import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from './ApiError.js';

export const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      next(ApiError.UNAUTHORIZED('Not authorized!'));

      return;
    }
  }

  if (!token) {
    next(ApiError.UNAUTHORIZED('Not authorized!'));
  }
};
