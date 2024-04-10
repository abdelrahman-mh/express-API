import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import config from './config';

// export const generateAuthToken = (payload: TokenPayload) => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
// };
// export const verifyToken = (token: string) => {
//   const tokenData = jwt.verify(token, JWT_SECRET);
//   return tokenData;
// };

export const hashPassword = async (password: string) => {
  const hashedpass: string = await bcrypt.hash(password, 10);
  return hashedpass;
};
