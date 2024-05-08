import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import UnAuth from './routes/UnAuth';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react';
import { updateAllTasks, toggleComplete, deleteTask } from './store/taskSlice';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.value);
  const taskList = useSelector((state) => state.tasks);

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleAddTask = async (text) => {
    if (text) {
      try {
        const newTask = { id: Date.now().toString(), text, completed: false };
        const response = await axios.post(`https://simple-todo-app-beta-five.vercel.app/users/${auth}/tasks`, newTask);
        dispatch(updateAllTasks(response.data.tasks))
        // console.log(taskList);
        setText('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      setError('Please enter task first!')
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (taskId) {
      try {
        const response = await axios.delete(`https://simple-todo-app-beta-five.vercel.app/deletetask/${auth}/${taskId}`);
        dispatch(deleteTask(taskId));
      } catch (error) {
        console.error('Error deleting:', error)
      }
    }
  }

  const handleToggleTask = async (taskId) => {
    if (taskId) {
      try {
        const response = await axios.patch(`https://simple-todo-app-beta-five.vercel.app/taskstatus/${auth}/${taskId}`);
        dispatch(toggleComplete(taskId));
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://simple-todo-app-beta-five.vercel.app/users/${auth}/tasks`);
        dispatch(updateAllTasks(response.data.tasks))
      } catch (error) {
        console.error('Error getting tasks:', error);
        // Handle error here
      }
    }
    if (auth) {
      fetchData();
    }
  }, [taskList, auth, dispatch])

  if (auth) {
    return (<>
      <Container>
        <h1 className='display-3 mt-3'>Your Todos</h1>
        <hr></hr>
        <Col className='col-8 mx-auto'>
          <Row>
            <InputGroup className="mb-3">
              <Form.Control
                className=''
                placeholder="Task details go here"
                aria-label="Task details go here"
                aria-describedby="basic-addon2"
                type='text'
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (error) {
                    setError('')
                  }
                }}
              />
              <Button variant="primary" id="button-addon2" onClick={() => handleAddTask(text)}>
                Add Task
              </Button>
            </InputGroup>
          </Row>

          <hr />

          <Row>
            <h1 className='display-5'>Active List</h1>
            <Table striped className='shadow'>
              <thead className='table-dark'>
                <tr className='text-center'>
                  <th className='col-8'>Task List</th>
                  <th className='col-4'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(taskList).map(taskId => {
                  const task = taskList[taskId];
                  if (!task.completed) {
                    return (
                      <tr key={taskId}>
                        <td>
                          {task.text}
                        </td>
                        <td className='text-center'>
                          <Button className='btn-success' onClick={() => handleToggleTask(taskId)}>Mark Complete</Button>
                          <Button className='btn-danger ms-1' onClick={() => handleDeleteTask(taskId)}>Delete</Button>
                        </td>
                      </tr>
                    );
                  } else {
                    return ('');
                  }
                })}
              </tbody>
            </Table>
          </Row>

          <hr />

          <Row>
            <h1 className='display-5'>Archived / Completed</h1>
            <Table striped className='shadow'>
              <thead className='table-dark'>
                <tr className='text-center'>
                  <th className='col-8'>Task List</th>
                  <th className='col-4'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(taskList).map(taskId => {
                  const task = taskList[taskId];
                  if (task.completed) {
                    return (
                      <tr key={taskId}>
                        <td>
                          {task.text}
                        </td>
                        <td className='text-center'>
                          <Button className='btn-warning' onClick={() => dispatch(toggleComplete(taskId))}>Mark Incomplete</Button>
                          <Button className='btn-danger ms-1' onClick={() => dispatch(deleteTask(taskId))}>Delete</Button>
                        </td>
                      </tr>
                    );
                  } else return ('');
                })}
              </tbody>
            </Table>
          </Row>

        </Col>
      </Container >
    </>);
  } else {
    return (<><UnAuth /></>)
  }
}

export default App;
