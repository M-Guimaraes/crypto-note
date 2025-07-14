import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Unauthorized' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { sub } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as {
      sub: { userId: string };
    };

    request.params.userId = sub.userId;
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid token' });
  }
}
