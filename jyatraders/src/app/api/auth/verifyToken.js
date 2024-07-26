import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Use environment variables for better security

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
