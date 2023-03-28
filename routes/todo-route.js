const express = require('express');
const router = express.Router();

const todoController = require('../controller/todo-controller');
const { route } = require('./user-route');

router.post('/:userId/create-todo', todoController.createTodo);
router.get("/:userId/get-all-todos", todoController.getAllTodos);
router.get("/:userId/get-todos-by-user-id", todoController.getTodoByUserId);
router.get("/:userId/:todoId/get-todo-by-todo-id", todoController.getTodoByTodoId);
router.delete("/:userId/:todoId/delete-todo-by-todo-id", todoController.deleteTodo);
router.delete("/:userId/:todoId/delete-all-todos-by-user-id", todoController.deleteTodoByUserId);
router.put("/:userId/:todoId/update-todo", todoController.updateTodo);

module.exports = router;
