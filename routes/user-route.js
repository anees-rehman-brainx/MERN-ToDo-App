const express = require('express');
const userController = require('../controller/user-controller')
const authMiddelware = require("../middelwares/authentication")
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/change-password", authMiddelware.verifyAuth, userController.changePassword);
router.get("/forgot-password", userController.forgotPassword);
router.put("/reset-password/:id/:token", userController.resetPassword)


module.exports = router;
