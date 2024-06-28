const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", authMiddleware, userController.logout);
router.get("/users", authMiddleware, userController.getUserList);
router.get("/user/:id", authMiddleware, userController.getUserById);
router.put("/user/:id", authMiddleware, userController.updateUser);
router.delete("/user/:id", authMiddleware, userController.deleteUser);

module.exports = router;
