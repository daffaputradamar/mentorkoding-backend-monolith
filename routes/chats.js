const express = require("express")
const router = express.Router()
const chatController = require("../controllers/chats")

const authService = require('../middlewares/authService')

router.use(authService)
router.get("/", chatController.index)
router.get("/:id", chatController.show)
router.post("/", chatController.store)

module.exports = router