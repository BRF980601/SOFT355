var express = require('express')
var router = express.Router()
var Chat = require('../models/Chat')

router.get('/', function(req, res) {
  Chat.find({}).then(function(data) {
    if (data.length) {
      res.json({
        success: 1,
        message: 'success!',
        data
      })
    } else {
      res.json({
        success: 0,
        message: 'no Chat!',
      })
    }
  })
})

router.post('/saveChat', function(req, res) {
  new Chat({
    sendUser: req.body.username,
    sendUserImage: req.body.image,
    message: req.body.msg
  })
    .save()
    .then(function() {
      res.json({
        success: 1,
        message: 'save Chat data success!'
      })
    })
})

module.exports = router
