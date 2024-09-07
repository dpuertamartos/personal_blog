// models/userAction.js
const mongoose = require('mongoose')

const userActionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  targetType: {
    type: String,
    enum: ['Blog', 'Comment'],
    required: true,
  },
  actionType: {
    type: String,
    enum: ['like', 'dislike'],
    required: true,
  },
})

module.exports = mongoose.model('UserAction', userActionSchema)
