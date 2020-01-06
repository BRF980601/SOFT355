var socket_io = require('socket.io')
var User = require('./../models/User')
var Chat = require('./../models/Chat')
var socketio = {} // 获取io
// let clientList = {} // 客户端连接用户
// let adminList = {} // 客户端连接用户
let io = null

socketio.getSocketio = function(server) {
  // http(s) server
  io = socket_io.listen(server)

  io.on('connection', function(socket) {
    console.log('websocket.io:' + socket.id)
    socket.on('login', function(data) {
      //登录
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
      //退出
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
      //接收到新消息
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
      //接收到图片
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

  // 管理端
  // let admin = io.of('/admin').on('connection', function(socket) {
  //   console.log('ADMIN_connection:' + socket.id)
  //   let token = socket.handshake.query.token
  //   adminList[socket.id] = {
  //     // isLogin:
  //     token
  //   }
  //   console.log(adminList)
  //   // socket.on('setToken', (res)=>{
  //   // }
  //   // 离线
  //   socket.on('disconnect', function(item) {
  //     // 这里监听 disconnect，就可以知道谁断开连接了
  //     console.log('disconnect: ' + socket.id)
  //     delete adminList[socket.id]
  //     console.log(adminList)
  //   })
  // })

  // // 客户端
  // let client = io.of('/client').on('connection', function(socket) {
  //   console.log('CLIENT_connection:' + socket.id)
  //   let token = socket.handshake.query.token
  //   clientList[socket.id] = {
  //     // isLogin:
  //     token
  //   }
  //   console.log(clientList)
  //   // socket.emit('noticeInfo', '这还是一个通知')
  //   // 离线
  //   socket.on('disconnect', function(item) {
  //     // 这里监听 disconnect，就可以知道谁断开连接了
  //     console.log('disconnect: ' + socket.id)
  //     delete clientList[socket.id]
  //   })
  // })
}
module.exports = socketio
