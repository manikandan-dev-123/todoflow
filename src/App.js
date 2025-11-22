import {useState} from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

function App() {
        //  Tasks (ToDo List) State
   const [toDo, setToDo] = useState([
       {id: 1, title: "Task 1", status: false},
     {id: 2, title: "Task 2", status: false}
  
     
   ]);

  //  Temp State
   const [newTask, setNewTask,] = useState('');
   const [updateData, setupdateData,] = useState('');

  //  Add task
      const addTask = () => {
        if(newTask) {
          let num = toDo.length + 1;
          let newEntry = {id: num, title: newTask, status: false }
          setToDo([...toDo, newEntry])
          setNewTask('');
        }
      }
     
        //  Delete task
      const deleteTask = (id) => {
        let newTask = toDo.filter( task => task.id !== id)
        setToDo(newTask)
      }
     
        //  Mark task as done or completed
      const markDone = (id) => {
        let newTask = toDo.map( task => {
          if( task.id === id){
            return({...task, status: !task.status })
          }
          return task;
        })
        setToDo(newTask);
      }

           //  Cancle update
      const cancelUpdate = () => {
        setupdateData('');
      }

        //  Change task for update
      const changeTask = (e) => {
        let newEntry = {
          id: updateData.id,
          title: e.target.value,
          status: updateData.status ? true : false
        }
        setupdateData(newEntry);
      }

      
        //  Update task
      const updateTask = () => {
        let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
        let updateObject = [...filterRecords, updateData]
        setToDo(updateObject);
        setupdateData('');
      }
  return (
    <div className="container App">
     
     <br></br>

     <h2>To Do List App (ReactJS)</h2>

     <br></br>
      {/* Update task */}
      {updateData && updateData ? (
      <UpdateForm 
      updateData={updateData}
      changeTask={changeTask}
      updateTask={updateTask}
      cancelUpdate={cancelUpdate}
      
      />
      ) : (
         <AddTaskForm 
         newTask={newTask}
         setNewTask={setNewTask}
         addTask={addTask}
         
         />
      )}


    
      {/* Display ToDos */}

           {toDo && toDo.length ? '' : 'No Tasks...'} 

    <ToDo 
       toDo={toDo}
       markDone={markDone}
       setupdateData={setupdateData}
       deleteTask={deleteTask}
    />


    </div>
  );
}

export default App;
