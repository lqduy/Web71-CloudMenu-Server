import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
      return res.status(400).json({
        message: 'Missing access token',
      });
    }

    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: 'Please authenticate',
      });
    } else {
      return res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  }
};

export default authMiddleware;
