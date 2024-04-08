import { Request, Response, NextFunction } from 'express';
import toDecodedToken from '../typeGuards/toDecodedToken';
import { verifyToken } from '../utils/helper';
import { ErrorTypes } from '../types/ErrorResponse';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get('authorization');

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: ErrorTypes.UNAUTHORIZED }).end();
  }

  const token = authorization.substring(7);
  console.log('token', token);

  try {
    const tokenData = verifyToken(token);
    const decodedToken = toDecodedToken(tokenData);

    req.user = decodedToken;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default authMiddleware;
