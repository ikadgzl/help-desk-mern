import ApiError from './ApiError.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json({
      error: {
        message: err.message
      }
    });

    return;
  }

  res.status(500).json({ message: 'Something went wrong.' });
};
