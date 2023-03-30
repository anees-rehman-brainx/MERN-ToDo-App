const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String, 
        required : [true , "Username is required"],
        minLength : [3, "Name is too short"]
    },
    email : {
        type : String, 
        required : true, 
        minLength : 10, 
        lowercase : true
    },
    password : {
        type : String, 
        required : true, 
        minLength : 8, 
    },

    token : {
        type : String
    }
}, {timestamps : true})

module.exports = mongoose.model("userModal",userSchema);
