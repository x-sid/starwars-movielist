import { body } from "express-validator";

const validate = {
  comment: [
    body("comment")
      .not()
      .isEmpty()
      .withMessage("Comment is required")
      .isString()
      .isLength({ max: 500 }),
  ],
};

export default validate;
