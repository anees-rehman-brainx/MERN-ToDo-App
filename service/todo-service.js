var todos = [];

// validate todo id
const validateTodoId = (todoId) => {
    const todo = todos.find(todo => todo.todoId === todoId);
    return todo ? true : false;
}

// add todo
const addTodo = (todo) => {
    todos.push(todo);
    return todos;
}

// get all todo
const getAllTodos = () => {
    return todos;
}

// getTodosByUserId
const getTodosByUserId = (userId) => {
    const userTodos = todos.filter(todo => todo.userId === userId);
    return userTodos;
}

// get todo by todo id
const getTodobyTodoId = (todoId) => {
    const todo = todos.find(todo => todo.todoId === todoId);
    return todo ? todo : false;
}

// update todo
const updateTodo = (todoId, message) => {
    const index = todos.findIndex(todo => todo.todoId === todoId);
    if(index != -1){
        todos[index].message = message;
    }
}

// delete todo by todo id
const deleteTodoByTodoId = (todoId) => {
    const newTodos = todos.filter(todo => todo.todoId != todoId);
    todos = newTodos;
}

// delete all todos by user id
const deleteTodosByUSerId = (userId) => {
    const newTodos = todos.filter(todo => todo.userId != userId);
    todos = newTodos;
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










