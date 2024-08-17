const { pool } = require('../config/database'); // pool nesnesini import ediyoruz

const findUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM auth.users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    console.log('Query result:', rows);
    return rows[0];
  } catch (err) {
    console.error('Error in findUserByEmail:', err.message);
    throw err;
  }
};

module.exports = {
  findUserByEmail,
};
