import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from 'utils/config';
import TokenModel from '../models/token.model';
import { TokensTypes, TokenDocument, AuthTokens, JwtPayload, Token } from 'types/token.types';
import { UserDocument } from 'types/user.types';
import boom from '@hapi/boom';

// Generate JWT token
export const generateToken = ({ userId, type }: { userId: string; type: TokensTypes }): string => {
  let expires: moment.Moment;
  switch (type) {
    case TokensTypes.ACCESS:
      expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
      break;
    case TokensTypes.REFRESH:
      expires = moment().add(config.jwt.refreshExpirationDays, 'days');
      break;
    case TokensTypes.RESET_PASSWORD:
      expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
      break;
    case TokensTypes.VERIFY_EMAIL:
      expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
      break;
    default:
      throw new Error('Invalid token type');
  }

  const payload: JwtPayload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };

  return jwt.sign(payload, config.jwt.secret, { algorithm: 'HS256' });
};

// Save a token via DB
export const saveToken = async ({ token, user, type, expires, blacklisted = false }: Token): Promise<TokenDocument> => {
  const tokenDoc = await TokenModel.create({
    token,
    user,
    expires,
    type,
    blacklisted,
  });
  return tokenDoc;
};

// Verify token and return token doc (or throw an error if it is not valid)
export const verifyToken = async (token: string, type: TokensTypes): Promise<TokenDocument> => {
  try {
    const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;
    if (typeof payload.sub !== 'string') {
      throw boom.badRequest('bad request');
    }
    const tokenDoc = await TokenModel.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });
    if (!tokenDoc) {
      throw boom.notFound('Token not found!');
    }
    return tokenDoc;
  } catch (error) {
    throw boom.unauthorized('Invalid token!');
  }
};

// Generate auth tokens
export const generateAuthTokens = async (user: UserDocument): Promise<AuthTokens> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes').toDate();
  const accessToken = generateToken({ type: TokensTypes.ACCESS, userId: user.id });

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days').toDate();
  const refreshToken = generateToken({ type: TokensTypes.REFRESH, userId: user.id });
  await saveToken({ token: refreshToken, type: TokensTypes.REFRESH, expires: refreshTokenExpires, user: user.id });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
export const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw boom.badRequest('');
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken({ userId: user.id, type: TokensTypes.RESET_PASSWORD });
  await saveToken({ token: resetPasswordToken, type: TokensTypes.RESET_PASSWORD, expires, user: user.id });
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {UserDocument} user
 * @returns {Promise<string>}
 */
export const generateVerifyEmailToken = async (user: UserDocument): Promise<string> => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken({ userId: user.id, type: TokensTypes.VERIFY_EMAIL });
  await saveToken({ token: verifyEmailToken, type: TokensTypes.VERIFY_EMAIL, expires, user: user.id });
  return verifyEmailToken;
};
