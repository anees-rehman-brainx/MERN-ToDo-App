
const { default: mongoose } = require("mongoose");
const todoService = require("../service/todo-service")

// Create Todo
const createTodo = async (req, res) => {
   try {
        const {title, message} = req.body;
        const user = req.user;
        
        if(!title || !message){
            res.status(406).json({message : "All feilds required"});
            return;
        }

        const newTodo = await todoService.addTodo(
            {
                userId : user._id, 
                title, 
                message
            });

        if(!newTodo){
            res.status(500).json({message : "Internal server error"});
            return;
        }

        res.status(201).json(
            {
                message : "todo created successfully", 
                payload : newTodo
            });

   } catch (error) {
        res.status(500).json({message : error});
   }
}

// get all todos
const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();

        if(!todos.length){
            res.status(404).json("Todo does not exist");
            return;
        }
       
        res.status(200).json(todos);

    } catch (error) {
        res.status(500).json(error);    
    }
}

// get todo by userId
const getTodoByUserId = async (req, res) => {
    try {
        const user = req.user;
        const todos = await todoService.getTodosByUserId(           
            {
                userId : new mongoose.Types.ObjectId(user._id) 
            }
        );

        if(!todos.length){
            res.status(404).json("Todo does not exist");
            return;
        }

        res.status(200).json(todos);
        
    } catch (error) {
        res.status(500).json(error);
    }

}

// get todo by todo id
const getTodoByTodoId =async (req, res) => {
    try {
        const {todoId} = req.params;
        const id = new mongoose.Types.ObjectId(todoId)
        const todo = await todoService.getTodobyTodoId({_id : id});
 
        if(!todo){
            res.status(404).json("Todo does not exist");
            return;
        }

        res.status(200).json(todo);

    } catch (error) {
        res.status(500).json(error)
    }
}

// update todo
const updateTodo = async (req, res) => {
    try {
        const {todoId} = req.params;
        const todo = req.body;

        if(!todo){
            res.status(406).json({message : "All feilds required"});
            return;
        }

        //updating the todo in database
        const updatedTodo = await todoService.updateTodo(
            {
                _id : new mongoose.Types.ObjectId(todoId)
            },
            { $set : todo },
            {
                new : true
            }
            );

        res.status(201).json({message : "Todo updated sucessfully", updateTodo});
        
    } catch (error) {
        res.status(500).json({message : error});
    }
}

// delete todo
const deleteTodo = async ( req, res) => {
    try {
        const {todoId} = req.params;

        const deletedTodo = await todoService.deleteTodoByTodoId(todoId);

        if(!deletedTodo){
            res.status(500).json("Unexpected error..");
            return;
        }

        res.status(200).json("Deleted successfully..");

    } catch (error) {
        res.status(500).json(error)
    }

}

// delete todo by user id
const deleteTodoByUserId = async (req, res) => {
    try {
        const user = req.user;        
        const deletedTodos = await todoService.deleteTodosByUSerId({userId:user._id});

        if(!deletedTodos.acknowledged){
            res.status(500).json("Unexpected error occured");
            return;
        }

        res.status(200).json("Todos deleted successfully..");

    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    createTodo,
    getAllTodos, 
    getTodoByUserId, 
    getTodoByTodoId, 
    updateTodo, 
    deleteTodo,
    deleteTodoByUserId
};