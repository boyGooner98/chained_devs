const express = require('express');
const router = express.Router();
const aut = require('../../middleware/auth');
const User = require('../../models/user/user');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');

router.post(
  '/login',
  [
    check('email', 'email cannot be empty').isEmail(),
    check('password', 'password cannot be empty').not().isEmpty(),
  ],
  async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({
       errors: errors.array(),
     });
   }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'wrong credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'wrong credentials' });
      }
      payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, config.SECRET, { expiresIn: 36000 }, (err, token) => {
        if (err) return res.send(err);
        return res.json({ token });
      });
    } catch (err) {
      return res.json(err);
    }
  }
);

router.get('/',aut, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send("no user found")
    }
    return res.send(user); 
  } catch (err) {
    return res.status(500).send('server error');
  }
});

router.get('/:id',async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user ) return res.json({"error":"no user found"})
    return res.json(user)
  } catch (err) {
    res.send(err);
  }
})
module.exports = router;
