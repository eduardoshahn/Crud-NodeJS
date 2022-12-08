import jwt from 'jsonwebtoken';

const SECRET = 'paranguaricutirimiruarum';

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
    return next();
  });
}

export default verifyToken;
