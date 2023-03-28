
const todoService = require("../service/todo-service")


// Create Todo
const createTodo = async (req, res) => {
    try {
        const {message} = req.body;
        const userId = req.params.userId;
        const date = new Date();

        const todo ={
            userId : userId,
            todoId : Math.floor(Math.random() * 100) + userId,
            message : message,
            createdAt : date
        }

        try {
            const todos = todoService.addTodo(todo);
            res.status(200).json({message : "Todo added successfully.."});
            
        } catch (error) {
            res.status(500).json(error)
        }
        
    } catch (error) {
        res.status(404).json(error)
    }
}

// get all todos
const getAllTodos = async (req, res) => {

    try {
        const todos = todoService.getAllTodos();
        res.status(200).json(todos);

    } catch (error) {
        res.status(404).json(error);    
    }
}

// get todo by userId
const getTodoByUserId = async (req, res) => {
    try {
        const {userId} = req.params;
        const todos = todoService.getTodosByUserId(userId);
        res.status(200).json(todos);
        
    } catch (error) {
        res.status(404).json(error);
    }

}

// get todo by todo id
const getTodoByTodoId =async (req, res) => {
    try {
        const {userId, todoId} = req.params;
        const todos = todoService.getTodobyTodoId(todoId);
        res.status(200).json(todos);

    } catch (error) {
        res.status(500).json(error)
    }
}

// update todo
const updateTodo = async (req, res) => {
    try {
        const {userId, todoId} = req.params;
        const {message} = req.body;

        if(todoService.validateTodoId(todoId)){
            todoService.updateTodo(todoId, message);
            res.status(200).json("Todo updated Successfully");
        }
        else{
            res.status(404).json("Todo does't exist");
        }

    } catch (error) {
        res.status(404).json(error);
    }
}

// delete todo
const deleteTodo = async ( req, res) => {
    try {
        const {userId, todoId} = req.params;

        if(todoService.validateTodoId(todoId)){
            todoService.deleteTodoByTodoId(todoId);
            res.status(200).json("Todo deleted successfully..");
        }

        else{
            res.status(500).json("unable to delete")
        }
    } catch (error) {
        res.status(404).json(error)
    }

}

// delete todo by user id
const deleteTodoByUserId = (req, res) => {
    try {
        const {userId, todoId} = req.params;
        
        try {
            todoService.deleteTodosByUSerId(userId);
            res.status(200).json("todo deleted successfully..");
        } catch (error) {
            res.status(500).json(error);
        }

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