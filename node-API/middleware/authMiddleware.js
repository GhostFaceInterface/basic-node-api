const { verifyToken } = require('../config/auth');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Token'dan elde edilen kullanıcı bilgilerini request objesine ekliyoruz
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = protect;
