import mongoose from "mongoose";
import Todos from "../models/todo.models.js"

const addTodo = async (req , res) => {
    const { taskName } = req.body

    if (!taskName) return res.status(400).json({
        message: "Task name is required"
    })

    try {
        //const todo = await Todos.create({taskame}) // class code 
        const todo = new Todos({ taskName });
        await todo.save();

        res.status(201).json({
            message: "Todo added successfully",
            todo,
        });
    } catch (err) {
        console.error('Error adding todo:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}
const getAllTodo = async (req , res) => {
    try {
        //const todos = await Todos.find({}); // class code
        const todos = await Todos.find();
        res.status(200).json({
            message: "Todos fetched successfully",
            todos,
        });
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}

const deleteTodo = async (req , res) => {
    const {id} = req.params;
    // Class code
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: "Not a valid Id",
        })
    }
    // Class code end

    try {

        //const todo = await Todos.findByIdAndDelete({id : id});
        const todo = await Todos.findByIdAndDelete(id);

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        res.status(200).json({
            message: "Todo deleted successfully",
            todo,
        });
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}
const editTodo = async (req , res) => {
    const {taskName} = req.body;
    const {id} = req.params;

    // Class code
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: "Not a valid Id",
        })
    }
    // Class code end

    if(!taskName) return res.status(400).json({
        message: 'Task name is required'
    })

    try {
        const todo = await Todos.findByIdAndUpdate(
            id,
            { taskName },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }

        res.status(200).json({
            message: "Todo updated successfully",
            todo,
        });
    } catch (err) {
        console.error('Error editing todo:', err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
}


export {addTodo, getAllTodo, deleteTodo, editTodo}