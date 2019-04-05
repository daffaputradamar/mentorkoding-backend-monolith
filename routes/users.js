const express = require("express")
const router = express.Router()
const userController = require("../controllers/users")

router.get("/", userController.index)
router.get("/:_id", userController.show)
router.post("/", userController.store)
router.put("/:_id", userController.update)
router.delete("/:_id", userController.destroy)
router.post("/login", userController.authenticate)
router.post("/search", userController.search)

module.exports = router