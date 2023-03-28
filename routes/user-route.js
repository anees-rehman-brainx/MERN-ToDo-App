const express = require('express');
const userController = require('../controller/user-controller')

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/change-password", userController.changePassword);
router.get("/forgot-password", userController.forgotPassword);
router.get("/reset-password/:id/:token", userController.resetPassword)


module.exports = router;
