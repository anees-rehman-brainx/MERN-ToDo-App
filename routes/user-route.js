const express = require('express');
const userController = require('../controller/user-controller')
const authMiddelware = require("../middelwares/authentication")
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/change_password", authMiddelware.verifyAuth, userController.changePassword);
router.post("/forgot_password", userController.forgotPassword);
router.put("/reset_password/:id/:token", userController.resetPassword)


module.exports = router;
