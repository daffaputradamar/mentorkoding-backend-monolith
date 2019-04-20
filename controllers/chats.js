const Chat = require('../models/Chat')
const Chatroom = require('../models/Chatroom')

module.exports = {
    index: (req, res) => {
        const { user } = req.body
        Chatroom.find({ users: {"$in": user } })
            .then(chatroom => {
                res.json(chatroom)
            })
    },
    show: (req, res) => {
        Chat.find({ chatroom: req.params.id })
            .sort({createdAt: -1})
            .exec((err, chat) => {
                res.json(chat)
            })
    },
    store: (req, res) => {
        const { user } = req.body
        Chatroom.find({ users: {"$in": user } })
            .then(chatroom => {
                if (!chatroom) {
                    Chatroom.create({
                        users: user
                    })
                    .then(() => res.json({
                        success: true,
                        message: `Created on ${Date.now()}`
                    }))
                } else {
                    res.json({
                        success: false,
                        message: 'Chatroom already exist'
                    })
                }
            })
    }
}