require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DRIVER || 'mysql'
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DRIVER || 'mysql'
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: process.env.DB_DRIVER || 'mysql'
    }
  }