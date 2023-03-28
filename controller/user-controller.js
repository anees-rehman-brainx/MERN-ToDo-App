const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();
const userService = require('../service/user-service');
const tokenService = require('../service/token-service')


// function to register user
const register = async(req, res) => {

    const {username, email, password, confirmPassword} = req.body;

    if(username ==  "" || email === "" || password === "" || confirmPassword === ""){
        res.status(400).json(("All feilds are required"));
        return;
    }
   
    const isEmailExist =await userService.validateEmail(email);

    if(isEmailExist){
        res.status(404).json("Email already exists");
        return;
    }

    if(password != confirmPassword){
        res.status(404).json("Password not same");
        return;
    }

    //Encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = {
        username : username,
        email : email,
        password : hashedPassword
    }

    const savedUser =await userService.addUser(user);
    
    if(!savedUser){
        res.status(500).json("Server Error");
    }
    else{
        const payload = {
            _id : savedUser._id,
            username : savedUser.username,
            email : savedUser.email,
            
        }
        res.status(201).json({message : "User created Successfully", user : payload});
    }
}

// function to login user
const login  = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(email === "" || password === ""){
            res.status(400).json("All feilds are required..");
            return;
        }

        const existedUser = await userService.getUserByEmail(email);

        if(!existedUser){
            res.status(400).json("Email does't exits");
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, existedUser[0].password);

        if(!isPasswordMatch){
            res.status(404).json("Wrong Password");
            return;
        }
        else{
            const payload = {
                _id : existedUser[0]._id,
                username : existedUser[0].username,
                email : existedUser[0].email
            }
          
            const secretKey = process.env.JWT_SECRET + password;
            const token = jwt.sign(payload, secretKey, {expiresIn : '30min'});

            try {
                const userToken = await tokenService.addToken(existedUser[0]._id, token);
                console.log(userToken)
                const user = await tokenService.getUserByToken(userToken);
                console.log(user)
                if(userToken){
                    res.status(201).json({message : "Login Successfull", token : userToken.token})
                }

            } catch (error) {
                res.json(error);
            }
        }
    } catch (error) {
        res.status(500).json(error);  
    }    
}


// Function to change password
const changePassword = async(req, res) => {
    const {email, oldPassword, newPassword, confirmNewPassword} = req.body;
    
    if(email === "" || oldPassword === "" || newPassword === "" || confirmNewPassword === ""){
        res.status(404).json("All feilds are required...");
        return;
    }

    const isUserExist = userService.getUserByEmail(email);

    if(!isUserExist){
        res.status(404).json("Email does't exist..");
        return;
    }

    if(isUserExist.password != oldPassword){
        res.status(404).json("Incorrect old password..");
        return;
    }

    if(newPassword != confirmNewPassword){
        res.status(404).json("New Password does't match");
        return;
    }

    if(newPassword == oldPassword){
        res.status(404).json("Old password and new password must be different");
        return;
    }

    userService.updatePassword(isUserExist.userId, newPassword);
    res.status(200).json("Password updated successfully....");
    res.status(200).json(isUserExist);
}

// Function to send link forgott password
const forgotPassword = async(req, res) => {
    const {email} = req.body;

    const user = userService.getUserByEmail(email);

    if(!user){
        res.status(404).json("Email does't exist");
        return;
    }

    // creating a unique token for password reset link
    const secretKey = process.env.JWT_SECRET + user.password;
    const payload = {email : user.email, id : user.id};
    const token = jwt.sign(payload, secretKey, {expiresIn : '15m'});

    // Password resett link that is to be mailed to user 
    const link = `http://localhost:${process.env.port}/user/reset-password/${user.userId}/${token}`;

    // response sent to user > in future it is implemented via nodemailer
    res.status(200).json(link);

}


// Function to resett password
const resetPassword = async(req, res) => {
    try {
        const {userId, token} = req.params;

        const isUserExist = users.find(user => user.userId === userId);

        if (!isUserExist ){
            res.status(400).json({error : "User Id does't exist"});
            return;
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // If Jwt token verifies render the page containing new password and confirm new password feilds.

    
    } catch (error) {
        res.json(error);
    }
    
    
}

module.exports = {register, login, changePassword, forgotPassword, resetPassword};