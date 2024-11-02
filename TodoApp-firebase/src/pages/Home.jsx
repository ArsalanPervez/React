import { useRef, useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebaseconfig';
import { collection, addDoc, getDocs, query, where, deleteDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Home() {
  const [task, setTask] = useState([]);
  const [editUserIndex, setEditTaskIndex] = useState(null); 
  const inputUser = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getDataFromFirestore = async () => {
      const q = query(collection(db, "todo"), where("uid", "==", auth.currentUser.uid));

      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        docid: doc.id
      }));
      setTask(tasksData);
    };

    getDataFromFirestore();
  }, []);

  const insertTask = async (e) => {
    e.preventDefault();
    const taskValue = inputUser.current.value;
    if (taskValue.trim() === "") return;

    try {
      if (editUserIndex !== null) {
        // If editing an existing task
        const taskToEdit = task[editUserIndex];
        const docRef = doc(db, "todo", taskToEdit.docid);

        // Update the task in Firestore
        await updateDoc(docRef, {
          taskName: taskValue,
          date: new Date().toLocaleString()
        });

        // Update local state
        const updatedTasks = [...task];
        updatedTasks[editUserIndex] = { ...taskToEdit, taskName: taskValue, date: new Date().toLocaleString() };
        setTask(updatedTasks);
        setEditTaskIndex(null);
      } else {
        // Add a new task
        const newDocRef = doc(collection(db, "todo"));
        const obj = {
          taskName: taskValue,
          date: new Date().toLocaleString(),
          uid: auth.currentUser.uid,
          docid: newDocRef.id
        };

        await setDoc(newDocRef, obj);
        setTask([...task, obj]);
      }

      inputUser.current.value = ""; // Clear the input field after adding/updating
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  const editTask = (index) => {
    setEditTaskIndex(index);
    inputUser.current.value = task[index].taskName;
  };

  const deleteTask = async (documentId) => {
    try {
      const docRef = doc(db, "todo", documentId);
      await deleteDoc(docRef);
      setTask(task.filter(t => t.docid !== documentId));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const logoutUser = () => {
    signOut(auth).then(() => {
        Swal.fire({
            title: "Good bye!",
            text: "Logged out successfully",
            icon: "success"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login')
            }
        });
    }).catch((error) => {
      console.error("Error while logout", error);
    });
  };

  return (
    <>
      <form onSubmit={insertTask}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "end", marginBottom: "20px"}}>
          <button className="three" onClick={logoutUser}>Logout</button>
        </div>
        <div className="app-container" id="taskList">
          <h1 className="app-header">TO DO LIST</h1>
          <div className="add-task">
            <input type="text" ref={inputUser} placeholder="Add New Task" className="task-input" />
            <button className="submit-task" type="submit"></button>
          </div>
          <ul className="task-list">
            {task.map((item, index) => (
              <li className="task-list-item" key={item.docid}>
                <label className="task-list-item-label">
                  <input type="checkbox" />
                  <span>Name: {item.taskName}</span>
                  <span>Date: {item.date.split(',')[0]}</span>
                </label>
                <div className="show-btn">
                  <span className='edit-btn' onClick={() => editTask(index)} title='Edit task'></span>
                  <span className="delete-btn" onClick={() => deleteTask(item.docid)} title="Delete Task"></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </>
  );
}

export default Home;
