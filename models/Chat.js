/**
 * chat history聊天记录
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
