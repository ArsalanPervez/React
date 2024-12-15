import express from "express"
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());


const arr = [];


// add todo
app.post("/add-todo", (req, res) => {
    const { taskName } = req.body

    if (!taskName) return res.status(404).json({
        message: "Task name is required"
    })

    const obj = {
        taskName,
        date: new Date().toLocaleString(),
        id: Date.now()
    }
    arr.push(obj)

    res.json({
        message: "Todo added successfully",
        todo: obj
    })

})

// get todo
app.get('/todo-list', (req, res) => {
    res.json({
        todos: arr
    })
})

// delete request
app.delete('/todo-delete/:id', (req, res) => {
    const { id } = req.params;

    const index = arr.findIndex((item) => item.id === +id);
    
    if(index === -1) return res.status(404).json({
        message: 'No todo found'
    })

    arr.splice(index , 1);

    res.json({
        message: "Todo deleted successfully"
    })

})

// edit todo
app.put('/todo-edit/:id' , (req , res)=>{
    const {taskName} = req.body;
    const {id} = req.params;

    if(!taskName) return res.status(404).json({
        message: 'Task name is required'
    })

    const index = arr.findIndex((item) => item.id === +id);
    
    if(index === -1) return res.status(404).json({
        message: 'No record found'
    })

    arr[index].taskName = taskName

    res.json({
        message: 'Todo updated successfully'
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})