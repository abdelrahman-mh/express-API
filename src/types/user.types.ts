import { GetType } from './main';
import { Model, Document } from 'mongoose';
import { AccessAndRefreshTokens } from './token.types';

export type User = GetType<'User'>;
export type NewUser = GetType<'NewUser'>;
export type UpdateUser = GetType<'UpdateUser'>;

export enum ROLES {
  User = 'User',
  Admin = 'Admin',
}
export interface RoleRights {
  [ROLES.User]: [];
  [ROLES.Admin]: ['read', 'write'];
}

interface UserSchema extends Omit<User, 'id'> {
  password: string;
  role: ROLES;
}
export interface UserDocument extends UserSchema, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}
export interface UserSchemaModel extends Model<UserDocument> {
  isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
}

export type NewRegisteredUser = Omit<User, 'role' | 'isEmailVerified'>;

export type NewCreatedUser = Omit<User, 'isEmailVerified'>;

export interface UserWithTokens {
  user: UserDocument;
  tokens: AccessAndRefreshTokens;
}
