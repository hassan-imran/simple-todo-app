import './App.css';
import TodoForm from './TodoForm';
import React, { useState } from 'react';
import { Card, Typography } from '@mui/joy';
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
    <Card className="App" style={{
      margin: 'auto',
      marginTop: '5em',
      maxWidth: '50%',
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Typography level='h1' style={{ marginTop: '0.25em' }}>Todo List</Typography>
      <TodoForm tasks={tasks} setTask={setTask} />
      <TodoList tasks={tasks} setTask={setTask} />
    </Card>
  );
}

export default App;
