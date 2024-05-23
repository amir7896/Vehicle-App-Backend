const { check, validationResult } = require("express-validator");
const { STATUS_CODE, ERRORS } = require("../../constants");

exports.validVehicle = [
  check("color")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.COLOR)
    .isString()
    .withMessage(ERRORS.REQUIRED.MUST_STRING("Color")),
  check("model")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.MODEL)
    .isString()
    .withMessage(ERRORS.REQUIRED.MUST_STRING("Modle")),
  check("make")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.MAKE)
    .isString()
    .withMessage(ERRORS.REQUIRED.MUST_STRING("Make")),
  check("registrationNo")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.REGISTRATION_NO)
    .isString()
    .withMessage(ERRORS.REQUIRED.MUST_STRING("Registration no")),
  check("category")
    .notEmpty()
    .withMessage(ERRORS.REQUIRED.CATEGORY)
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
