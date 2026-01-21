const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token or invalid token format' });
    }

    const token = authHeader.split(' ')[1]; // remove "Bearer"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token expired or invalid' });
  }
};
