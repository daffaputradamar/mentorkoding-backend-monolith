const express = require("express")
const router = express.Router()
const meetupController = require("../controllers/meetups")

const authService = require('../middlewares/authService')

router.use(authService)
router.get("/", meetupController.index)
router.get("/:_id", meetupController.show)
router.post("/", meetupController.store)
router.put("/:_id", meetupController.update)
router.delete("/:_id", meetupController.destroy)

module.exports = router