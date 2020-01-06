const mongoose = require('mongoose')

// database link
var mongooseLink = function() {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost:27017/chatio', { useNewUrlParser: true, useUnifiedTopology: true }, function(
      err,
      data
    ) {
      if (err) {
        reject('数据库连接失败！' + err)
      } else {
        resolve('数据库连接成功！')
      }
    })
  })
}

module.exports = mongooseLink
