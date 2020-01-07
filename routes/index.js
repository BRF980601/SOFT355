var express = require('express')
var router = express.Router()
var User = require('../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies.user)
  if (!req.cookies.user) {
    res.redirect('/users/login')
  } else {
    if (!req.cookies.flag) {
      User.findOne({
        username: req.cookies.user
      }).then(function(userInfo) {
        res.render('index', {
          username: userInfo.username,
          useravatar: userInfo.image
        })
      })
    } else {
      res.redirect('/users/exit')
    }
  }
})

module.exports = router
