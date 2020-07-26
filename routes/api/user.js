const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/user/user');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config.json')

// /api/user

// USER GET REQUESTS
// USER POST REQUESTS
router.post(
  '/register',
  [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password is required').isLength({ min: 5 }),
    check('email', 'email is required').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email:email } )
      if (user) {
        return res.status(400).json({ msg: "user already exists" })
      }
      user = new User(req.body)
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pf',
        d: 'mm'
      })
      user.avatar = avatar;

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password,salt)
      await user.save();
       
      const payload = {
        user: {
          id:user.id
        }
      }
      jwt.sign(payload, config.SECRET, { expiresIn: 36000 }, (err, token) => {
        if (err) return res.send(err)
        return res.json({token})
     })
     
    } catch (err) {
      return res.status(500).send(err)
    }
       
  })
//USER DELETE REQUESTS
module.exports = router;
