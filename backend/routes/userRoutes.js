const router = require("express").Router()
const {register, login, getUserInfo, loginWithGoogle} = require("../controllers/userControllers")
const authMiddleware = require("../middlewares/authMiddleware")

router.post('/register',register)
router.post('/login',login)
router.post('/get-user-info',authMiddleware,getUserInfo)
router.get("/google",loginWithGoogle)

module.exports = router