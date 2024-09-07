import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
