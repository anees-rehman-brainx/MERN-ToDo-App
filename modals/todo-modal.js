const mongoose = require('mongoose');
const status = require('../constants/shared')

const todoSchema = mongoose.Schema({
 
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    todoStatus : {
        type : String,
        enum : status.todoStatus,
        default : status.todoStatus.incomplete
    }
    
}, {timestamps : true})

module.exports = mongoose.model("todoModel", todoSchema);