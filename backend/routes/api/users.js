const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({min: 1})
    .withMessage('First Name is required.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Last Name is required.'),
  check('email')
    .isEmail()
    .withMessage('Invalid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('you could make a better password.'),
  handleValidationErrors
];

const router = express.Router();

// Sign up
// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, firstName, lastName, password, username } = req.body;
    if (await User.findOne({where: {email: email}})) {
      const err = new Error("User with that email already exists");
      err.status = 403;
      err.title = 'Sign up failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    const user = await User.signup({ email, firstName, lastName, username, password });

    const token = await setTokenCookie(res, user);

    return res.json({
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "token": token
    });
  }
);




module.exports = router;