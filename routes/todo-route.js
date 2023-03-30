const express = require('express');
const router = express.Router();
const todoController = require('../controller/todo-controller');
const { route } = require('./user-route');
const authMiddelware = require('../middelwares/authentication')

router.post('/create-todo/', authMiddelware.verifyAuth, todoController.createTodo);
router.get("/get-all-todos", authMiddelware.verifyAuth, todoController.getAllTodos);
router.get("/get-todos-by-user-id/", authMiddelware.verifyAuth, todoController.getTodoByUserId);
router.get("/get-todo-by-todo-id/:todoId", authMiddelware.verifyAuth, todoController.getTodoByTodoId);
router.delete("/delete-todo-by-todo-id/:todoId", authMiddelware.verifyAuth, todoController.deleteTodo);
router.delete("/delete-all-todos-by-user-id/", authMiddelware.verifyAuth, todoController.deleteTodoByUserId);
router.put("/update-todo/:todoId", authMiddelware.verifyAuth, todoController.updateTodo);

module.exports = router;
