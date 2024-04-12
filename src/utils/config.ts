import * as dotenv from 'dotenv';

dotenv.config();

type Config = {
  port: string;
  db_uri: string;
  env: string;
  clientUrl: string;
  jwt: {
    secret: string;
    accessExpirationMinutes: number;
    refreshExpirationDays: number;
    resetPasswordExpirationMinutes: number;
    verifyEmailExpirationMinutes: number;
    cookieOptions: {
      httpOnly: boolean;
      secure: boolean;
      signed: boolean;
    };
  };
  email: {
    smtp: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
    from: string;
  };
};

function validateEnv() {
  const requiredEnvVariables = [
    'PORT',
    'DB_URI',
    'NODE_ENV',
    'CLIENT_URL',
    'JWT_SECRET',
    'JWT_ACCESS_EXPIRATION_MINUTES',
    'JWT_REFRESH_EXPIRATION_DAYS',
    'JWT_RESET_PASSWORD_EXPIRATION_MINUTES',
    'JWT_VERIFY_EMAIL_EXPIRATION_MINUTES',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USERNAME',
    'SMTP_PASSWORD',
    'EMAIL_FROM',
  ];

  const missingEnvVariables = requiredEnvVariables.filter((variable) => !(variable in process.env));
  if (missingEnvVariables.length > 0) {
    throw new Error(`Missing environment variables: ${missingEnvVariables.join(', ')}`);
  }

  // Check specific types for some variables
  if (isNaN(Number(process.env.PORT))) {
    throw new Error('PORT must be a number');
  }
  if (isNaN(Number(process.env.SMTP_PORT))) {
    throw new Error('SMTP_PORT must be a number');
  }
  if (isNaN(Number(process.env.JWT_ACCESS_EXPIRATION_MINUTES))) {
    throw new Error('JWT_ACCESS_EXPIRATION_MINUTES must be a number');
  }
  if (isNaN(Number(process.env.JWT_REFRESH_EXPIRATION_DAYS))) {
    throw new Error('JWT_REFRESH_EXPIRATION_DAYS must be a number');
  }
}

const ENV = process.env;

const config: Config = {
  env: ENV.NODE_ENV as string,
  port: ENV.PORT as string,
  db_uri: ENV.DB_URI as string,
  clientUrl: ENV.CLIENT_URL as string,
  jwt: {
    secret: ENV.JWT_SECRET as string,
    accessExpirationMinutes: parseInt(ENV.JWT_ACCESS_EXPIRATION_MINUTES as string),
    refreshExpirationDays: parseInt(ENV.JWT_REFRESH_EXPIRATION_DAYS as string),
    resetPasswordExpirationMinutes: parseInt(ENV.JWT_RESET_PASSWORD_EXPIRATION_MINUTES as string),
    verifyEmailExpirationMinutes: parseInt(ENV.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES as string),
    cookieOptions: {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      signed: true,
    },
  },
  email: {
    smtp: {
      host: ENV.SMTP_HOST as string,
      port: parseInt(ENV.SMTP_PORT as string),
      auth: {
        user: ENV.SMTP_USERNAME as string,
        pass: ENV.SMTP_PASSWORD as string,
      },
    },
    from: ENV.EMAIL_FROM as string,
  },
};

validateEnv(); // Validate environment variables before using them

export default config;
