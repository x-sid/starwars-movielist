import { validationResult } from "express-validator";
import { BadRequestResponse } from "../core/api-response.mjs";

const result = (req, res, next) => {
  const errors = validationResult(req).array({
    onlyFirstError: true,
  });

  if (errors.length) {
    return new BadRequestResponse(errors);
  }
  return next();
};

export default result;
