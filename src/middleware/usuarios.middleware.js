import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    return next();
  });
}

export default verifyToken;
