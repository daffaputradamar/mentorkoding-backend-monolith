const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

function createHash(password) {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    resolve(hash)
  })
}

function isPasswordMatch(password, hashedPassword) {
  return new Promise(async (resolve, reject) => {
    let isMatch = await bcrypt.compare(password, hashedPassword)
    resolve(isMatch)
  })
}

function signJWT(payload) {
    return new Promise(async (resolve, reject) => {
        token = await jwt.sign({data: payload}, `${process.env.JWT_SECRET}`, {expiresIn: '1d'})
        resolve(token)
    })
}

module.exports = {
  index: async (req, res) => {
    res.json(await User.find())
  },
  show: async (req, res) => {
    res.json(await User.findById(req.params._id))
  },
  store: async (req, res) => {
    let user = req.body
    user.password = await createHash(user.password)
    res.json(await User.create(user))
  },
  update: async (req, res) => {
    const { _id } = req.params
    res.json(await User.findOneAndUpdate({ _id }, { $set: req.body }, {new: true}))
  },
  destroy: async (req, res) => {
    res.json(await User.findOneAndDelete({ _id: req.params._id }))
  },
  authenticate: async (req, res) => {
    let user = req.body
    userFromDb = await User.findOne({ username: user.username })
    let isMatch = await isPasswordMatch(user.password, userFromDb.password) ? true : false
    if (isMatch) {
        let token = await signJWT(userFromDb)
        res.json({
            success: "true",
            token
        })
    } else {
        res.json({
            success: "false"
        })
    }
  },
  search: async (req, res) => {
    const { skill } = req.body
    res.json(await User.find({ skills: { "$in": skill}, isMentor: true }))
  },
  profile: async (req, res) => {
    res.json(await User.findById(req.user._id))    
  },
  updateProfile: async (req, res) => {
    res.json(await User.findOneAndUpdate({_id: req.user._id}, { $set: req.body }, {new: true}))
  }
}
