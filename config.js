require('dotenv').config();

module.exports = {
  appPort: process.env.APP_PORT || 3000,
  db: {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432
  }
};
