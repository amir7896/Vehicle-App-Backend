exports.ERRORS = {
  SERVER_ERROR: "Internal server errror",
  BAD_REQUEST: "Bad request",
  FORBIDDEN: "Forbidden",
  UN_AUTHORIZE: "Unauthorized access",
  EMAIL_ALREADY_EXISTS: "Email already exists",
};

exports.REQUIRED = {
  // User required
  USER_NAME: "Username is required",
  USER_EMAIL: "Email is required",
  USER_PASSWORD: "Password is required",
  VALID_EMAIL: "Provide a valid email",
  // Category required
  CATEGORY_NAME: "Category name is required",
  // Vehicle required
  CATEGORY: "Category is required",
  MODEL: "Model is required",
  COLOR: "Color is required",
  MAKE: "Make is required",
  REGISTRATION_NO: "Registration no is required",
  // Method for return error for string
  MUST_STRING: function (fieldName) {
    return `${fieldName} must be string`;
  },
};

exports.INVALID = {
  INVALID_LOGIN_CREDENTIALS: "Email or Password is Incorrect",
  USER_NOT_EXISTS: "User not exists",
};

exports.CATEGORY = {
  NOT_CREATED: "Category not created",
  NOT_DELETED: "Category not deleted",
  NOT_UPDATED: "Category not updated",
  NOT_FOUNDS: "Categories not found",
  NOT_EXISTS: "Category not exist in database",
};

exports.VEHICLE = {
  NOT_CREATED: "Vehicle not created",
  NOT_DELETED: "Vehicle not deleted",
  NOT_UPDATED: "Vehicle not updated",
  NOT_FOUNDS: "Vehicles not found",
  NOT_EXISTS: "Vehicle not exist in database",
};

exports.AUTH = {
  NOT_REGISTERD: "User not registerd",
  NOT_LOGIN: "User not logged in ",
};
