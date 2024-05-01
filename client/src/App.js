import './App.css';
import TodoForm from './TodoForm';
import React, { useState } from 'react';
import { Card, Typography } from '@mui/joy';
import TodoList from './TodoList';
import NavBar from './NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  // const [tasks, setTask] = useState([
  //   {
  //     id: 1,
  //     text: 'Dummy Task',
  //     completed: false,
  //   },
  // ]);

  return (
    <div>
      <NavBar />
      <Card className="App" style={{
        margin: 'auto',
        marginTop: '5em',
        maxWidth: '50%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography level='h1' style={{ marginTop: '0.25em' }}>Todo List</Typography>
        <TodoForm />
        <TodoList />
      </Card>
    </div>
  );
}

export default App;
