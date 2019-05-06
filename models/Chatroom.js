const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChatroomSchema = new Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model("Chatroom", ChatroomSchema)