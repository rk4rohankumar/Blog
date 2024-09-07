import dotenv from 'dotenv';
dotenv.config();
export const jwtSecret=process.env.JWT_SECRET;
export const mongoURI=process.env.MONGO_URI;
export const PORT=process.env.PORT;
export const NODE_ENV=process.env.NODE_ENV; 

  