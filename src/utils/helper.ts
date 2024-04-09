import { TokenPayload } from '../types/Token';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './config';

const JWT_SECRET = config.jwtKey;
const saltRounds = config.saltRounds;

export const generateAuthToken = (payload: TokenPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};
export const verifyToken = (token: string) => {
  const tokenData = jwt.verify(token, JWT_SECRET);
  return tokenData;
};

export const hashPassword = async (password: string) => {
  const hashedpass: string = await bcrypt.hash(password, saltRounds);
  return hashedpass;
};

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Partial<T> {
  return keys.reduce((acc, key) => {
    // eslint-disable-next-line security/detect-object-injection
    const value = obj[key];
    if (value !== undefined) {
      // eslint-disable-next-line security/detect-object-injection
      acc[key] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

export default pick;
