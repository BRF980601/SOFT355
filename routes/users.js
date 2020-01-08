var express = require('express')
var router = express.Router()
var User = require('../models/User')

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' })
})

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register' })
})

// 注册
router.post('/signUp', function(req, res) {
  var username = req.body.username
  var password = req.body.password
  User.findOne({
    username: username
  })
    .then(function(userInfo) {
      if (userInfo) {
        res.json({
          success: 0,
          message: 'The user name has been registered!'
        })
        return false
      } else {
        var user = new User({
          username: username,
          password: password,
          image: '/images/people.png',
          state: false
        })
        return user.save()
      }
    })
    .then(function() {
      res.json({
        success: 1,
        message: 'Registration successful!'
      })
    })
})

// 登录
router.post('/signIn', function(req, res, next) {
  var username = req.body.username
  var password = req.body.password
  var resData = {}
  User.findOne({
    username: username,
    password: password
  }).then(function(userInfo) {
    if (!userInfo) {
      resData.success = 0
      resData.message = 'Incorrect user name or password!'
      res.json(resData)
      return false
    } else {
      if (userInfo.state) {
        resData.success = 0
        resData.message = 'The user is logged in!'
        res.json(resData)
        return false
      } else {
        User.update(
          {
            _id: userInfo._id
          },
          {
            state: true
          }
        ).then(function() {
          resData.success = 1
          resData.message = 'Login successful!'
          res.cookie('user', userInfo.username, { maxAge: 1000 * 60 * 60 })
          res.json(resData)
          // next()
        })
      }
    }
  })
})

// 登出
router.get('/exit', function(req, res) {
  User.update(
    {
      username: req.cookies.user
    },
    {
      state: false
    }
  ).then(function() {
    res.clearCookie('user')
    res.clearCookie('flag')
    res.redirect('/users/login')
  })
})

module.exports = router
