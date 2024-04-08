import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import userServices from '../service/userServices';
import { generateAuthToken } from '../utils/helper';
import { TokenPayload } from '../types/Token';
import toAuth from '../typeGuards/toAuth';
import { parseMongooseId } from '../typeGuards/helper';

const signup = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const payload = toAuth.toSignup(req.body);
      const newUser = await userServices.createUser(payload);
      res.json({ user: newUser });
   } catch (error) {
      next(error);
   }
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const payload = toAuth.toSignIn(req.body);
      const user = await userServices.findUser(payload.email);

      if (user && (await bcrypt.compare(payload.password, user.password))) {
         console.log('pass encrypt');
         const tokenPayload: TokenPayload = {
            username: user.username,
            email: user.email,
            id: parseMongooseId(user.id, 'id'),
         };
         const token = generateAuthToken(tokenPayload);
         console.log('pass generate token');

         res.status(200).json({ token, user });
      } else {
         res.status(401).json({ error: 'Invalid credentials' });
      }
   } catch (error) {
      next(error);
   }
};

const authController = {
   signup,
   signIn,
};

export default authController;
