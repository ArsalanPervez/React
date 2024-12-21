import Todos from "../models/todo.models.js"

const addTodo = async (req , res) => {
    const { taskName } = req.body

    if (!taskName) return res.status(404).json({
        message: "Task name is required"
    })

    try {
        const todo = new Todos({ taskName });
        await todo.save();

        res.status(200).json({
            message: "Todo added successfully",
            todo,
        });
    } catch (err) {
        console.error('Error adding todo:', err);
        res.status(404).json({
            message: "Failed to add todo",
            error: err.message,
        });
    }
}
const getAllTodo = async (req , res) => {
    try {
        const todos = await Todos.find();
        res.status(200).json({
            message: "Todos fetched successfully",
            todos,
        });
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(404).json({
            message: "Failed to fetch todos",
            error: err.message,
        });
    }
}

const deleteTodo = async (req , res) => {
    const {id} = req.params;
    try {
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
        res.status(404).json({
            message: "Failed to delete todo",
            error: err.message,
        });
    }
}
const editTodo = async (req , res) => {
    const {taskName} = req.body;
    const {id} = req.params;

    if(!taskName) return res.status(404).json({
        message: 'Task name is required'
    })

    try {
        const todo = await Todos.findByIdAndUpdate(
            id,
            { taskName },
            { new: true } // Return the updated document
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
        res.status(404).json({
            message: "Failed to edit todo",
            error: err.message,
        });
    }
}


export {addTodo, getAllTodo, deleteTodo, editTodo}