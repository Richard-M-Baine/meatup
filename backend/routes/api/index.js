// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const meRouter = require('./me.js')

const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);


router.use('/session', sessionRouter)

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

  





// end of file
module.exports = router;