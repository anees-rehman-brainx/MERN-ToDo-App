const todoModal = require("../modals/todo-modal") 

// validate todo id
const validateTodoId = async (todoId) => {
    const todo = await todoModal.findOne({_id : todoId});
    return todo ? true : false;
}

// add todo tp database
const addTodo = async (todo) => {
   const savedTodo = await new todoModal(todo);
   return savedTodo.save();
}

// get all todo
const getAllTodos = async () => {
    const todos = await todoModal.find();
    return todos;
}

// getTodosByUserId
const getTodosByUserId = async (userId) => {
    const todo = await todoModal.find({userId : userId});
    return todo;
}

// get todo by todo id
const getTodobyTodoId = async (todoId) => {
   const todo = await todoModal.findById(todoId);
   return todo;
}

// update todo
const updateTodo = async (todoId, todo) => {
    const updateTodo = await todoModal.findByIdAndUpdate({_id : todoId}, todo);
    console.log(updateTodo)
    return updateTodo;
}

// delete todo by todo id
const deleteTodoByTodoId = async (todoId) => {
    const isDeleted = await todoModal.findByIdAndDelete(todoId);
    return isDeleted;
}


const deleteTodosByUSerId = async (userId) => {
    const isDeleted  = await todoModal.deleteMany({userId : userId});
    return isDeleted;
}


module.exports = {
    validateTodoId,
    addTodo,
    getAllTodos,
    getTodobyTodoId,
    getTodosByUserId,
    updateTodo,
    deleteTodoByTodoId,
    deleteTodosByUSerId
}










