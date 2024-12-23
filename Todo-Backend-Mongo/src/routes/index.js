import express from "express"
import { addTodo, deleteTodo, editTodo, getAllTodo } from "../controllers/todos.controllers.js"

const router = express.Router()


router.post('/add-todo' , addTodo)
router.get('/todo-list' , getAllTodo)
router.delete('/todo-delete/:id' , deleteTodo)
router.put('/todo-edit/:id' , editTodo)

export default router;