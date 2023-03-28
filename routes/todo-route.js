const express = require('express');
const router = express.Router();

const {createTodo, getAllTodos,getTodoByUserId,getTodoByTodoId, deleteTodo,deleteTodoByUserId, updateTodo} = require('../controller/todo-controller');
const { route } = require('./user-route');

router.post('/:userId/create-todo', createTodo);
router.get("/:userId/get-all-todos", getAllTodos);
router.get("/:userId/get-todos-by-user-id", getTodoByUserId);
router.get("/:userId/:todoId/get-todo-by-todo-id", getTodoByTodoId);
router.delete("/:userId/:todoId/delete-todo-by-todo-id", deleteTodo);
router.delete("/:userId/:todoId/delete-all-todos-by-user-id", deleteTodoByUserId);
router.put("/:userId/:todoId/update-todo", updateTodo);

module.exports = router;
