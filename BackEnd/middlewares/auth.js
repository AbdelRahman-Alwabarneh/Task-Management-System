require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.authToken; // استخراج التوكن من الكوكيز
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth;
