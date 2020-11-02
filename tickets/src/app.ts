import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@czytickets/common";

const app = express();
app.set("trust proxy", true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    // singed: false means disable the auto encry since PWT will
    // do the encryption already.
    signed: false,
    // must be on the HTTPS request
    secure: true,
  })
);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
