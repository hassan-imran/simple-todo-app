import './App.css';
import TodoForm from './TodoForm';
import React, {useState} from 'react';
import TodoList from './TodoList';



function App() {
  const [tasks, setTask] = useState([
    {
      id: 1,
      text: 'Dummy Task',
      completed: false,
    },
  ]);
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm tasks={tasks} setTask={setTask} />
      <TodoList tasks={tasks} setTask={setTask}/>
    </div>
  );
}

export default App;
