const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetupSchema = new Schema({
  topic: {
    type: String,
    required: true
  },
  mentor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  detailPlace: {
    type: String,
    required: true
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
  isFinished: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Meetup", MeetupSchema);
