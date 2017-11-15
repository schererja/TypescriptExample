import * as crypto from "crypto";

function createSalt(length: number, callback: (error: Error, salt: string) => any) {
  if (length <= 0) {
    return callback(new Error("Length needs to be greater than 0."), null);
  }
  let salt = crypto.randomBytes(Math.ceil(length / 2))
                    .toString("hex")
                    .slice(0, length);
  callback(null, salt);
}

export = createSalt;