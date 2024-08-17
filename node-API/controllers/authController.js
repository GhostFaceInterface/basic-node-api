const { generateToken } = require('../config/auth.js');
const { findUserByEmail } = require('../models/userModel.js');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.log('Invalid credentials: User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Encrypted password:', user.encrypted_password);
    const isMatch = await bcrypt.compare(password, user.encrypted_password);
    if (!isMatch) {
      console.log('Invalid credentials: Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    console.log('Token generated:', token);

    res.status(200).json({ token });
  } catch (err) {
    console.error('Server error during login:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login,
};
