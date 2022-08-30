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
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password} = req.body;
    const user = await User.signup({ firstName, lastName,email,password});

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);




module.exports = router;