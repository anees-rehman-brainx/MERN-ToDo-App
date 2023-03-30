
const todoService = require("../service/todo-service")

// Create Todo
const createTodo = async (req, res) => {
   try {
        const {title, message} = req.body;
        const {userId} = req.params;

        if(!title || !message){
            res.status(406).json("All feilds required");
            return;
        }

        const newTodo = await todoService.addTodo({userId, title, message});

        if(!newTodo){
            res.status(500).json("Internal server error");
            return;
        }

        res.status(201).json({message : "todo created successfully", payload : newTodo});

   } catch (error) {
        res.status(500).json(error);
   }
}

// get all todos
const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();

        if(todos.length === 0){
            res.status(404).json("Todo does not exist");
            return;
        }
       
        res.status(200).json(todos);

    } catch (error) {
        res.status(404).json(error);    
    }
}

// get todo by userId
const getTodoByUserId = async (req, res) => {
    try {
        const {userId} = req.params;
        const todos = await todoService.getTodosByUserId(userId);

        if(todos.length === 0){
            res.status(404).json("Todo does not exist");
            return;
        }

        res.status(200).json(todos);
        
    } catch (error) {
        res.status(404).json(error);
    }

}

// get todo by todo id
const getTodoByTodoId =async (req, res) => {
    try {
        const {userId, todoId} = req.params;
        const todo = await todoService.getTodobyTodoId(todoId);
 
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
        const {title, message} = req.body;

        if(!title || !message){
            res.status(406).json("All feilds required");
            return;
        }

        const updatedTodo = await todoService.updateTodo(todoId,{title: title, message: message});

        if(!updatedTodo){
            res.status(500).json("Server error");
        }

        res.status(201).json(updatedTodo);
        
    } catch (error) {
        res.status(404).json(error);
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
        res.status(404).json(error)
    }

}

// delete todo by user id
const deleteTodoByUserId = async (req, res) => {
    try {
        const {userId} = req.params;        
        const deletedTodos = await todoService.deleteTodosByUSerId(userId);

        if(!deletedTodos.acknowledged){
            res.status(500).json("Unexpected error occured");
            return;
        }

        res.status(200).json("Todos deleted successfully..");

    } catch (error) {
        res.status(404).json(error);
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