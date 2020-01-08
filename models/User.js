/** 
 * user modules用户模块
 */
 
const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    image: String,
    state: Boolean
  },
  {
    timestamps: {
      createdAt: 'createtime',
      updatedAt: 'updatetime'
    }
  }
)

module.exports = mongoose.model('User', userSchema)
