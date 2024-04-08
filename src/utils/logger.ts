import config from './config';

const isDevelopment = config.env === 'development';

const log = (...messages: unknown[]): void => {
  if (isDevelopment) {
    console.log(`[INFO] ${messages.join(' ')}`);
  }
};

const error = (message: string): void => {
  if (isDevelopment) {
    console.error(`[ERROR] ${message}`);
  }
};

export { log, error };
