type Config = {
  db_uri: string;
  jwt_key: string;
  port: string;
  env: string;
};

const config: Config = {
  db_uri: process.env.DB_URI as string,
  jwt_key: process.env.JWT_KEY as string,
  port: process.env.PORT as string,
  env: process.env.NODE_ENV as string,
};

export default config;
