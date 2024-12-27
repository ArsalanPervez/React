import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [task, setTask] = useState([]);
  const [editUserIndex, setEditTaskIndex] = useState(null); 
  const inputUser = useRef();

  useEffect(()=>{
    async function getData(){
      const response = await axios('https://react-tmp1.vercel.app/api/v1/todo-list')
      setTask(response.data.todos)
    }
    getData()
  } , [])

  const insertTask = async (e) => {
    e.preventDefault();
    const taskValue = inputUser.current.value;
    if (taskValue.trim() == "") return; 

    let obj = {
      taskName: taskValue,
    };

    if (editUserIndex !== null) {
      const updatedUsers = [...task];
      const response = await axios.put(`https://react-tmp1.vercel.app/api/v1/todo-edit/${editUserIndex}` , obj)
      let result = task.findIndex((item)=> item._id == editUserIndex)
      updatedUsers[result].taskName = response?.data?.todo?.taskName;
      updatedUsers[result].updatedAt = response?.data?.todo?.updatedAt;
      setTask(updatedUsers);
      setEditTaskIndex(null); 
    } else {
      const response = await axios.post('https://react-tmp1.vercel.app/api/v1/add-todo' , obj)
      setTask([...task, response.data.todo]);
    }
    inputUser.current.value = "";
  };

  const editTask = (id) => {
    setEditTaskIndex(id);
    let result = task.findIndex((item)=> item._id == id)
    inputUser.current.value = task[result].taskName; 
  };

  const deleteTask = async (id) => {
    const filteredUsers = [...task];
    const response = await axios.delete(`https://react-tmp1.vercel.app/api/v1/todo-delete/${id}`)
    let result = task.findIndex((item)=> item._id == id)
    filteredUsers.splice(result, 1); 
    setTask(filteredUsers);
  };

  return (
    <>
    <form onSubmit={insertTask}>
      <div className="app-container" id="taskList">
          <h1 className="app-header">TO DO LIST</h1>
          <div className="add-task">
            <input type="text" ref={inputUser} placeholder="Add New Task" className="task-input"/>
            <button className="submit-task" type="submit"></button>
          </div>
          <ul className="task-list">
            {task.map((item, index) => (
              <li className="task-list-item" key={item._id}>
                <label className="task-list-item-label">
                  <input type="checkbox"/>
                  <span>Name: {item?.taskName}</span>
                  <span>Date: {new Date(item?.updatedAt)?.toLocaleString()}</span>
                </label>
                <div className="show-btn">
                  <span className='edit-btn' onClick={()=> editTask(item._id)} title='Edit task'></span>
                  <span className="delete-btn" onClick={()=> deleteTask(item._id)} title="Delete Task"></span>
                </div>
              </li>
            ))}
          </ul>
      </div>
      </form>
    </>
  );
}

export default App;