import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { tokenService } from '../token';
import * as userService from '../service/user.services'
import * as authService from './auth.service';
import { emailService } from '../email';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (err) {
    next(err);
  }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};
export const refreshTokens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userWithTokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...userWithTokens });
  } catch (err) {
    next(err);
  }
};
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.resetPassword(req.query['token'], req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};

export const sendVerificationEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken, req.user.name);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authService.verifyEmail(req.query['token']);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};
