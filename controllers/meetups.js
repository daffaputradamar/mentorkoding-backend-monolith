const Meetup = require('../models/Meetup')

module.exports = {
    index: (req, res) => {
        Meetup.find({
            $or: [{ mentor: req.user._id }, { student: req.user._id }],
            isFinished: false
        })
            .sort({date: 1})
            .populate("student")
            .populate("mentor")
            .exec()
            .then(meetups => res.json(meetups))
            .catch(err => console.log(err))
    },
    indexFinished: (req, res) => {
        Meetup.find({
            $or: [{ mentor: req.user._id }, { student: req.user._id }],
            isFinished: true
        })
            .sort({date: -1})
            .populate("student")
            .populate("mentor")
            .exec()
            .then(meetups => res.json(meetups))
            .catch(err => console.log(err))
    },
    show: (req, res) => {
        Meetup.findById(req.params._id)
            .populate("student")
            .populate("mentor")
            .then(meetups => res.json(meetups))
            .catch(err => console.log(err))
    },
    store: (req, res) => {
        let meetup = req.body
        meetup.student = req.user._id
        Meetup.create(meetup)
            .then(meetup => res.json(meetup))
            .catch(err => console.log(err))
    },
    update: (req, res) => {
        const meetup = req.body
        const { _id } = req.params
        Meetup.findOneAndUpdate({ _id }, { $set: meetup }, {new: true})
            .then(meetup => res.json(meetup))
            .catch(err => console.log(err))
    },
    destroy: (req, res) => {
        Meetup.findOneAndDelete({ _id: req.params._id })
            .then(() => res.sendStatus(204))
            .catch((err) => console.log(err))
    }
}
