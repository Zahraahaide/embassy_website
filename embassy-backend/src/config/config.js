require('dotenv').config(); // Load variables from .env file

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/embassy_db',
  port: process.env.PORT || 5000,
};
