const mongoose = require('mongoose');
const status = require('../constants/shared')

const todoSchema = mongoose.Schema({
 
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "user-modals",
        required : [true,"User id is required"]
    },
    title : {
        type : String,
        required :  [true,"Todo title is required"]
    },
    message : {
        type : String,
        required :  [true,"Todo message is required"]
    },
    todoStatus : {
        type : String,
        enum : status.todoStatus,
        default : status.todoStatus.incomplete
    }
    
}, {timestamps : true})

module.exports = mongoose.model("todoModel", todoSchema);