const jwt = require('jsonwebtoken')
const config = require('../config.json')
const secret = config.SECRET

module.exports = function (req, res, next) {
    const token = req.header('x-auth-header')
    if (!token) {
        return res.json({
            msg:"no token exists"
        })
    }
    try {
        const decode = jwt.verify(token, secret)
        req.user = decode.user
        next();
    }
    catch (err) {
        return res.json({
           msg:"unable to decode"
       })
    }
}