const express = require("express")
const router = express.Router()
const userController = require("../controllers/users")

const authService = require('../middlewares/authService')

router.get("/", userController.index)
router.get("/profile", authService, userController.profile)
router.get("/:_id", userController.show)
router.post("/", userController.store)
router.put("/profile", authService, userController.updateProfile)
router.put("/:_id", userController.update)
router.delete("/:_id", userController.destroy)
router.post("/login", userController.authenticate)
router.post("/search", userController.search)

module.exports = router