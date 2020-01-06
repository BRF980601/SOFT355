/** 
 * 用户模块
 * 
 * @Author: yu_meng_cheng@163.com 
 * @Date: 2019-12-25 11:14:53 
 * @Last Modified by: yu_meng_cheng@163.com
 * @Last Modified time: 2019-12-25 11:47:07
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
