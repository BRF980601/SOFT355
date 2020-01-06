/**
 * 聊天记录
 *
 * @Author: yu_meng_cheng@163.com
 * @Date: 2019-12-25 11:14:53
 * @Last Modified by: yu_meng_cheng@163.com
 * @Last Modified time: 2019-12-25 22:50:02
 */

const mongoose = require('mongoose')
const chatSchema = mongoose.Schema(
  {
    sendUser: String,
    sendUserImage: String,
    receiveUser: String,
    receiveUserImage: String,
    message: String
  },
  {
    timestamps: {
      createdAt: 'createtime',
      updatedAt: 'updatetime'
    }
  }
)

module.exports = mongoose.model('Chat', chatSchema)
