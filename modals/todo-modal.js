const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
 
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
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
        enum : ["incomplete", "inProgress", "completed"],
        default : "incomplete"
    },
    createdAt : {
        type : Date,
        default : () => Date.now(),
        immutable : true
    }
})

module.exports = mongoose.model("todoModel", todoSchema);