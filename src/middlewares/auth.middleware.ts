import { Response, Request, NextFunction } from 'express';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['x-auth'];

  if (authHeader) {
    if (authHeader === process.env.AUTH_KEY) {
      next();
    } else {
      res.status(403).json({ error: 'Access forbidden: Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'Access denied: No token provided' });
  }
}
