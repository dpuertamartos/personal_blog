require('dotenv').config()

const PORT = process.env.PORT
const DB_TYPE = process.env.DB_TYPE || 'mongodb'  // Add a DB_TYPE to select between MongoDB and PostgreSQL
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.NODE_ENV === 'development'
    ? process.env.DEV_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  DB_TYPE
}
