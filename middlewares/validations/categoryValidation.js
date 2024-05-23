const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.validCategory = [
  check("categoryName")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.CATEGORY_NAME)
    .isString()
    .withMessage(ERRORS.REQUIRED.MUST_STRING("Category")),

  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map((error) => error.msg);
    if (!errors.isEmpty()) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: errorMessages[0] });
    }
    next();
  },
];
