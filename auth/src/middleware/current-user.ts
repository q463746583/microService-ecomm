import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// Let TS know the currentUser has a type
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // !req.session?.jwt   ==  !req.session || req.session.jwt
  // for avoid the ts detection
  // Since TS dont know req.session
  if (!req.session?.jwt) {
    return next();
  }

  //verify() will throw err if the keys are messed
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
