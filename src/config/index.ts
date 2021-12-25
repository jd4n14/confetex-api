export default (): IConfiguration => ({
  server: {
    name: process.env.APP_NAME || 'Betelsoft',
    port: parseInt(process.env.APP_PORT, 10) || 4000,
    env: process.env.APP_ENV,
    url: process.env.APP_URL,
  },

  auth: {
    key: process.env.AUTH_SECRET_KEY,
    expiresIn: process.env.AUTH_EXPIRES_IN,
  },
  database: {
    host: process.env.MIKRO_ORM_HOST,
    port: parseInt(process.env.MIKRO_ORM_PORT, 10) || 5432,
    user: process.env.MIKRO_ORM_USER,
    name: process.env.MIKRO_ORM_DB_NAME,
    password: process.env.MIKRO_ORM_PASSWORD,
  },
});

export interface IConfiguration {
  server: {
    name: string;
    port: number;
    env: string;
    url: string;
  };
  auth: {
    key: string;
    expiresIn: string;
  };
  database: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
  };
}
