const router  = require("express").Router()
console.log("UserRoutes Loaded")
const upload = require("../middleware/UploadMiddleware")
const userController = require("../controllers/UserController")
const authMiddleware = require("../middleware/AuthMiddleware")
router.get("/",userController.getAllUsers)
// Signup Route
router.post("/signup", userController.createUser)
router.post("/",userController.createUser)
router.delete("/delete/:id",userController.deleteUser)
router.post("/login",userController.loginUser)

router.get("/profile",authMiddleware,userController.getProfile)
router.post("/upload-profile",upload.single("profilePic"),userController.uploadProfile)

router.put("/profilePic",authMiddleware,upload.single("image"),userController.uploadProfilePic)
router.put("/update-profile",authMiddleware,userController.updateProfile)
module.exports = router   