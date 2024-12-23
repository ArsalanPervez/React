import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)


export default mongoose.model("Todos", todoSchema);