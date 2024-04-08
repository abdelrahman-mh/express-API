import { Document, Types } from 'mongoose';

export interface User {
   username: string;
   email: string;
   password: string;
   id: Types.ObjectId;
}

export type ValidUser = Omit<User, 'password'>;
export type NewUser = Omit<User, 'id'>;
export interface NewUserDocument extends NewUser, Document {}
export interface UserDocument extends Document, User {
   id: Types.ObjectId;
}
