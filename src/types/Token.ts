import { Types } from 'mongoose';

export interface TokenPayload {
   username: string;
   email: string;
   id: Types.ObjectId;
}
export interface DecodedToken extends TokenPayload {
   iat: number;
   exp: number;
}
