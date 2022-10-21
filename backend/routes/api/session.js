//// backend/routes/api/login.js NOT session.js

const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { token } = require('morgan');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email is required.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required.'),
  handleValidationErrors
];



// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      if (!credential || !password) {
        res.status(400);
        return res.json({
          "message": "Validation error",
          "statusCode": 400,
          "errors": {
            "email": "Email is required",
            "password": "Password is required"
          }
        })
      }
  
      const user = await User.login({ credential, password });

  
      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

  
      await setTokenCookie(res, user);
  
      let response = await User.scope('currentUser').findOne({
        where: {
            email: credential
        }
      })
      res.json(response)
    });


    // Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(user);
    } else return res.json(null);
  }
);


module.exports = router;