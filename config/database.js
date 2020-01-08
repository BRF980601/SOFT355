const mongoose = require('mongoose')

// database link
var mongooseLink = function() {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost:27017/chatio', { useNewUrlParser: true, useUnifiedTopology: true }, function(
      err,
      data
    ) {
      if (err) {
        reject('Database connection failed!' + err)
      } else {
        resolve('Database connection succeeded!')
      }
    })
  })
}

module.exports = mongooseLink
