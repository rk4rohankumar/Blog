import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import zod from 'zod'
import {jwtSecret} from '../config/config.js';

export const generateToken = (userId) => {
  try {
    return jwt.sign({ id: userId },jwtSecret, { expiresIn: '10hr' });
  } catch (error) {
    console.error('Token generation error:', error);
    return null;
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

export const decodeToken = (req) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    return jwt.decode(token, jwtSecret);
  } catch (error) {
    console.error('Token decoding error:', error);
    return null;
  }
};

export const hashPassword = async (password) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        return await bcryptjs.hash(password, salt);
    } catch (error) {
        console.error('Hashing Error:', error);
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcryptjs.compare(password, hashedPassword);
    } catch (error) {
        console.error('Password comparison error:', error);
        return false;
    }
}

export const validateEmail = (email) => {
    const schema = zod.string().email();
    try {
        schema.parse(email);
        return true;
    } catch (error) {
        return false;
    }
}

export const validatePassword = (password) => {
    const schema = zod.string().min(8);
    try {
        schema.parse(password);
        return true;
    } catch (error) {
        return false;
    }
}
