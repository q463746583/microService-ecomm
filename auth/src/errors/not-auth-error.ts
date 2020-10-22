import { CustomError } from "./custom-error";

export class notAuthError extends CustomError {
  statusCode = 401;
  constructor() {
    super("Not Authorized");

    // extend a build in class need to add this line
    Object.setPrototypeOf(this, notAuthError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Authorized " }];
  }
}
