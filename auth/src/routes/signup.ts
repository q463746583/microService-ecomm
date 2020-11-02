import express, { Request, Response } from "express";
import "express-async-errors";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest, BadRequestError } from "@czytickets/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Length of password must between 4 and 20 "),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email was picked already");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate the JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // sign in to verify the token is valid
      // { we should share it all services}
      // If TS has error, add check !process in index.ts file
      // and add exlcaimation sign
      process.env.JWT_KEY!
    );

    // Store JWT in cookie session object
    // Cookie session will serialize it and
    // send it back to the user browser
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
