var socket_io = require('socket.io')
var User = require('./../models/User')
var Chat = require('./../models/Chat')
var socketio = {} // 获取io

let io = null

socketio.getSocketio = function(server) {
  // http(s) server
  io = socket_io.listen(server)

  io.on('connection', function(socket) {
    console.log('websocket.io:' + socket.id)
    socket.on('login', function(data) {
      //login登录
      var username = data.username
      socket.username = username
      User.find().then(function(data) {
        for (var i = 0; i < data.length; i++) {
          if (!data[i].state) {
            data.splice(i, 1)
          }
        }
        socket.emit('loginSuccess', data)
        socket.broadcast.emit('user_list', data)
        socket.broadcast.emit('userIn', username)
      })
    })
    socket.on('disconnect', function(data) {
      //Exit退出
      var username = data.username || socket.username
      User.findOne({
        username: username
      })
        .then(function(userInfo) {
          if (userInfo) {
            return User.update(
              {
                _id: userInfo._id
              },
              {
                state: false
              }
            )
          }
        })
        .then(function() {
          return User.find()
        })
        .then(function(data) {
          for (var i = 0; i < data.length; i++) {
            if (!data[i].state) {
              data.splice(i, 1)
            }
          }
          socket.broadcast.emit('user_list', data)
          socket.broadcast.emit('userOut', username)
        })
    })
    socket.on('postNewMsg', function(data) {
      //Received a new message接收到新消息
      new Chat({
        sendUser: data.username,
        sendUserImage: data.image,
        message: data.msg
      })
        .save()
        .then(function() {})
      socket.broadcast.emit('newMsg', data)
    })
    socket.on('postImg', function(data) {
      //Received a new image接收到图片
      socket.broadcast.emit('newImg', data)
    })

    socket.on('edit', function(data) {
      var username = data.username || socket.username
      User.findOne({
        username: username
      })
        .then(function(userInfo) {
          return User.update(
            {
              _id: userInfo._id
            },
            {
              username: data.newName,
              image: data.newImage
            }
          )
        })
        .then(function() {
          socket.username = data.newName
          return User.find()
        })
        .then(function(data) {
          for (var i = 0; i < data.length; i++) {
            if (!data[i].state) {
              data.splice(i, 1)
            }
          }
          socket.emit('user_list', data)
          socket.broadcast.emit('user_list', data)
        })
    })
  })
}
module.exports = socketio
