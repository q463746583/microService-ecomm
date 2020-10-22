import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";
import { validateRequest } from "../middleware/validate-request";
import { BadRequestError } from "../errors/bad-request-errors";
import { User } from "../models/user";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must supply a message"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid Credientials");
    }

    const DoesPasswordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!DoesPasswordMatch) {
      throw new BadRequestError("Invalid Credientials");
    }

    // Generate the JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      // sign in to verify the token is valid
      // { we should share it all services}
      // If TS has error, add check !process in index.ts file
      // and add exlcaimation sign
      "asdf"
    );

    // Store JWT in cookie session object
    // Cookie session will serialize it and
    // send it back to the user browser
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
