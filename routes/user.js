const express = require("express");
const router = express.Router();

const { signUp, login } = require("../controllers/user");
const {
  validSignUp,
  validLogin,
} = require("../middlewares/validations/authValidation");

router.post("/signup", validSignUp, signUp);
router.post("/signin", validLogin, login);

module.exports = router;
