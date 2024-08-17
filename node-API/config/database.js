const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const connectionString = process.env.POSTGRE_URI;

const pool = new Pool({
  connectionString: connectionString,
});

const db = async () => {
  try {
    // Verifying the connection by running a simple query
    await pool.query('SELECT NOW()');
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err.message);
    throw err;  // Throw the error to be handled by the calling function
  }
};

module.exports = {
  db,
  pool,
};
