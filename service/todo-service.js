const todoModal = require("../modals/todo-modal") 

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
const getTodosByUserId = async (cond) => {
    const todos = await todoModal.find(cond);
    return todos;
}

// get todo by todo id
const getTodobyTodoId = async (todoId) => {
   const todo = await todoModal.findById(todoId);
   return todo;
}

// update todo
const updateTodo = async (cond, todo, options) => {
    const updateTodo = await todoModal.findByIdAndUpdate(cond, todo, options);
    return updateTodo;
}

// delete todo by todo id
const deleteTodoByTodoId = async (todoId) => {
    const isDeleted = await todoModal.findByIdAndDelete(todoId);
    return isDeleted;
}


const deleteTodosByUSerId = async (userId) => {
    const isDeleted  = await todoModal.deleteMany(userId);
    return isDeleted;
}


module.exports = {
    addTodo,
    getAllTodos,
    getTodobyTodoId,
    getTodosByUserId,
    updateTodo,
    deleteTodoByTodoId,
    deleteTodosByUSerId
}










