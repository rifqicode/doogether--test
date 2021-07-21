const dotenv = require('dotenv');
dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hiring_backend',
  },
};


module.exports = config;