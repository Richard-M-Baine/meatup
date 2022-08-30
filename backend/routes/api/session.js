//// backend/routes/api/login.js NOT session.js

const express = require('express')
const router = express.Router();


const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { token } = require('morgan');



// Log in
router.post(
    '/',
    async (req, res, next) => {
      const { credential, password } = req.body;

      if (!credential || !password){
        console.log('i am here')
      }
  
      const user = await User.login({ credential, password });

  
      if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'this works invalid credentails is good';
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
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);


module.exports = router;