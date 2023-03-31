const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String, 
        required : [true , "Username is required"],
        minLength : [3, "Name is too short"]
    },
    email : {
        type : String, 
        required : [true, "Email is required"], 
        minLength : [10, "email should be minimum 10 characters"], 
        lowercase : true
    },
    password : {
        type : String, 
        required : true, 
        minLength : 8, 
    },

    token : {
        type : String,
        default : null
    }
}, {timestamps : true})

module.exports = mongoose.model("userModal",userSchema);
