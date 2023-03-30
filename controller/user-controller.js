const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();
const userService = require('../service/user-service');
const jwtService = require('../service/jwt-service')


// function to register user
const register = async (req, res) => {

    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            res.status(406).json(("All feilds are required"));
            return;
        }

        const isEmailExist = await userService.getUserByEmail(email);

        if (isEmailExist) {
            res.status(403).json("Email already exists");
            return;
        }

        if (password !== confirmPassword) {
            res.status(400).json("Password not same");
            return;
        }

        //Encrypting the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const savedUser = await userService.addUser({ username, email, password: hashedPassword });

        const token = jwtService.generateAccessToken(savedUser._id);
        const userUpdatedToken = await userService.updateUser(
            { _id: savedUser._id },
            {
                $set: {
                    token
                }
            },
            { new: true }
        )
        res.status(201).json({ message: "User created Successfully", userUpdatedToken });

    } catch (error) {
        res.status(404).json(error);
    }

}

// function to login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(406).json("All feilds are required..");
            return;
        }

        const existedUser = await userService.getUserByEmail(email);

        if (!existedUser) {
            res.status(401).json("Email does't exits");
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, existedUser.password);
       
        if (!isPasswordMatch) {
            res.status(401).json("Wrong Password");
            return;
        }

        res.setHeader("access-control-expose-headers", "access-token")
            .header("access-token", jwtService.generateAccessToken(existedUser))
            .status(200)
            .json({ user: existedUser })


    } catch (error) {
        res.status(500).json(error);
    }
}


// Function to change password
const changePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword, confirmNewPassword } = req.body;
        const {userId} = req.params;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            res.status(406).json("All feilds are required...");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            res.status(404).json("New Password does't match");
            return;
        }

        const existedUser = await userService.getUserById(userId);

        //comparing old password provided by user and password in database against userId
        const isPasswordMatch = await bcrypt.compare(oldPassword, existedUser.password);

        if (!isPasswordMatch) {
            res.status(404).json("Incorrect old password..");
            return;
        }

        //comparing new password and old password in DB
        const isPasswordSame = await bcrypt.compare(newPassword, existedUser.password);

        if (isPasswordSame) {
            res.status(404).json("Old password and new password must be different");
            return;
        }

        //generating hash for new password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const updatedUser = await userService.updateUser(
            {_id : existedUser._id},
            {$set : 
                {password : hashedPassword}
            }, 
            {new : true})

        if(updatedUser){
            res.status(200).json("Password updated successfully....");
        }

    } catch (error) {
        res.status(404).json(error);    
    }
    
}

// Function to send link forgott password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await userService.getUserByEmail(email);

    if (!user) {
        res.status(404).json("Email does't exist");
        return;
    }

    // creating a unique token for password reset link
    const token = jwtService.generateAccessToken(user);

    // Password resett link that is to be mailed to user 
    const link = `${process.env.HOST}/user/reset-password/${user._id}/${token}`;
    
    // response sent to user > in future it is implemented via nodemailer
    const nodemail = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'aneesrehmanur@gmail.com',
            pass : process.env.PASSWORD
        }
    });

    let mailDetails = {
        from : process.env.USERNAME,
        to : user.email,
        subject : "Password Resett Link",
        text : "Click on below link to reset password",
        html : `<a href = ${link}>Reset Password </a>`
    }

    nodemail.sendMail(mailDetails, function(err, data){
        if(err){
            res.status(500).json(err);
        } else{
           res.status(200).json("Password Resett link has been sent to your email")
        }

    })
}


// Function to resett password
const resetPassword = async (req, res) => {
    try {
        const { userId, token } = req.params;
        const {newPassword, confirmNewPassword} = req.body;

        const existedUser = await userService.getUserById(userId);
        let idFromToken = null ;
        
        jwtService.verifyToken(
            token,
            process.env.JWT_TOKEN_KEY,
            async (err, user) => {
                if (err) {
                    console.log(user)
                    return res.status(401).json({ error: "Token is not valid!" });
                }
                if(user){
                    idFromToken = user._id;
                }
            } );
        
        if(!idFromToken || idFromToken !== existedUser._id){
            return res.status(401).json({ error: "Token is not valid!" });
        }

        //if token and userId verified
        if(newPassword !== confirmNewPassword){
            return res.status(406).json("Password does't match");
        }

        //generating password hash and updating in database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const updatedUser = await userService.updateUser({_id : existedUser._id}, {$set : {password : hashedPassword}}, {new : true});

        if(!updatedUser){
            return res.status(500).json("Unexpected error occured");
        }

        return res.status(201).json("Password updated successfully..");

    }
    catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { 
    register, 
    login, 
    changePassword, 
    forgotPassword, 
    resetPassword 
};