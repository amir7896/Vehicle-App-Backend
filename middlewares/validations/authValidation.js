const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.validSignUp = [
  check("username")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.USER_NAME)
    .isString()
    .withMessage(ERRORS.REQUIRED.MUST_STRING("Username")),
  check("email")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.USER_EMAIL)
    .isEmail()
    .withMessage(ERRORS.REQUIRED.VALID_EMAIL),

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

exports.validLogin = [
  check("email")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.USER_EMAIL)
    .isEmail()
    .withMessage(ERRORS.REQUIRED.VALID_EMAIL),
  check("password")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.USER_PASSWORD)
    .isString()
    .withMessage(ERRORS.REQUIRED.MUST_STRING("Password")),

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
