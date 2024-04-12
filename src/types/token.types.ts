import { Model } from 'mongoose';
import { JwtPayload as NativeJwtPayload } from 'jsonwebtoken';

export enum TokensTypes {
  ACCESS = 'access',
  REFRESH = 'refresh',
  RESET_PASSWORD = 'resetPassword',
  VERIFY_EMAIL = 'verifyEmail',
}
export interface Token {
  token: string;
  user: string;
  type: TokensTypes;
  expires: Date;
  blacklisted: boolean;
}
export interface NewToken extends Omit<Token, 'blacklisted'> {}
export interface TokenDocument extends Token, Document {}
export interface TokenSchemaModel extends Model<TokenDocument> {}
export interface JwtPayload extends NativeJwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: TokensTypes;
}
export interface TokenPayload {
  token: string;
  expires: Date;
}
export interface AccessAndRefreshTokens {
  access: TokenPayload;
  refresh: TokenPayload;
}
