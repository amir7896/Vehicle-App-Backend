const User = require("../models/user");

const { generateRandomPassword } = require("../helpers");
const authService = require("../services/authService");
const { STATUS_CODE, SUCCESS_MSG, ERRORS } = require("../constants");
const { sendEmails } = require("../services/sendEmails/sendMail");

const signUp = async (req, res) => {
  const { username, email } = req.body;
  try {
    //   Genrating random password
    const password = generateRandomPassword(6);
    //   Hasing password
    const hashPassword = await authService.hashPassword(password);

    //  Send email data
    const subject = "Account Registration";
    const html = `<h3> Welcome  ${username} To The Vehicle Web App </h3>
              <h3>Your account created successfully.</h3>
              <h4>Now you can login using these credentials.</h4>
              <h4>Email: ${email}</h4>
              <h4>Password: ${password}</h4> 
            `;
    // New user object
    const user = new User({
      username,
      email,
      password: hashPassword,
    });

    const response = await user.save();

    if (response) {
      // if user registerd successfully then send email to user
      await sendEmails(email, subject, html);
      return res
        .status(STATUS_CODE.CREATED)
        .json({ success: true, message: SUCCESS_MSG.AUTH_MSG.USER_REGISTER });
    } else {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ success: false, message: ERRORS.AUTH.NOT_REGISTERD });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(STATUS_CODE.CONFLICT).json({
        success: false,
        message: ERRORS.ERRORS.EMAIL_ALREADY_EXISTS,
      });
    } else {
      return res.status(STATUS_CODE.SERVER_ERROR).json({
        success: false,
        message: ERRORS.ERRORS.SERVER_ERROR,
        error: error.message,
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await authService.comparePassword(
        password,
        user.password
      );

      // User data
      const userData = {
        id: user._id,
        email: user.email,
        username: user.username,
      };
      if (isMatch) {
        const token = await authService.generateToken(userData);

        return res.status(STATUS_CODE.OK).json({
          success: true,
          message: SUCCESS_MSG.AUTH_MSG.LOGIN_SUCCESS,
          user: userData,
          token: token,
        });
      } else {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          success: false,
          message: ERRORS.INVALID.INVALID_LOGIN_CREDENTIALS,
        });
      }
    } else {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ success: false, message: ERRORS.INVALID.USER_NOT_EXISTS });
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      message: ERRORS.SERVER_ERROR,
      error: error.message,
    });
  }
};

module.exports = {
  signUp,
  login,
};
