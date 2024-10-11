import { useRef, useState } from 'react';

function App() {
  const [task, setTask] = useState([{taskName: "Task 1", date: new Date().toLocaleString()}]);
  const [editUserIndex, setEditTaskIndex] = useState(null); 
  const inputUser = useRef();

  const insertTask = (e) => {
    e.preventDefault();
    const taskValue = inputUser.current.value;

    if (taskValue.trim() == "") return; 

    let obj = {
      taskName: taskValue,
      date: new Date().toLocaleString(),
    };

    if (editUserIndex !== null) {
      const updatedUsers = [...task];
      updatedUsers[editUserIndex] = obj;
      setTask(updatedUsers);
      setEditTaskIndex(null); 
    } else {
      setTask([...task, obj]);
    }
    inputUser.current.value = "";
  };

  const editTask = (index) => {
    setEditTaskIndex(index);
    inputUser.current.value = task[index].taskName; 
  };

  const deleteTask = (index) => {
    const filteredUsers = [...task];
    filteredUsers.splice(index, 1); 
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
              <li className="task-list-item" key={index}>
                <label className="task-list-item-label">
                  <input type="checkbox"/>
                  <span>Name: {item.taskName}</span>
                  <span>Date: {item.date.split(',')[0]}</span>
                </label>
                <div className="show-btn">
                  <span className='edit-btn' onClick={()=> editTask(index)} title='Edit task'></span>
                  <span className="delete-btn" onClick={()=> deleteTask(index)} title="Delete Task"></span>
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