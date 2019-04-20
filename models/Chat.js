const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ChatSchema = new Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chatroom',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Chat", ChatSchema);
