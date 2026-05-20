const expenseController = require("../controllers/ExpenseController")
const router = require("express").Router()
const authMiddleware =require("../middleware/AuthMiddleware")
const upload = require("../middleware/UploadMiddleware")
router.post("/",authMiddleware,expenseController.createExpense)
router.get("/expbyuserid",authMiddleware,expenseController.getExpesneByUserId)
router.get("/search",authMiddleware,expenseController.searchExp)
router.put("/uploadreceipt",authMiddleware,upload.single("receipt"),expenseController.uploadReceipt)
router.delete("/:id",authMiddleware,expenseController.deleteExpense)
module.exports = router


