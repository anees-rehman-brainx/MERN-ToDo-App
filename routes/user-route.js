const express = require('express');
const {register, login, changePassword,forgotPassword,resetPassword} = require('../controller/user-controller')

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/change-password", changePassword);
router.get("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", resetPassword)


module.exports = router;
