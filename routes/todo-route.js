const express = require('express');
const router = express.Router();
const todoController = require('../controller/todo-controller');
const { route } = require('./user-route');
const authMiddelware = require('../middelwares/authentication')

router.post('/create_todo/', authMiddelware.verifyAuth, todoController.createTodo);
router.get("/get_all_todos", authMiddelware.verifyAuth, todoController.getAllTodos);
router.get("/get_todos_by_user_id", authMiddelware.verifyAuth, todoController.getTodoByUserId);
router.get("/get_todo_by_todo_id/:todoId", authMiddelware.verifyAuth, todoController.getTodoByTodoId);
router.delete("/delete_todo_by_todo_id/:todoId", authMiddelware.verifyAuth, todoController.deleteTodo);
router.delete("/delete_all_todos_by_user_id/", authMiddelware.verifyAuth, todoController.deleteTodoByUserId);
router.put("/update_todo/:todoId", authMiddelware.verifyAuth, todoController.updateTodo);

module.exports = router;
