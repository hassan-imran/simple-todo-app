import { Table, Button, Typography } from '@mui/joy';

const TodoList = ({ tasks, setTask }) => {

    const deleteTask = (id) => {
        setTask(tasks.filter(task => task.id !== id));
    };

    const markCompleted = (id) => {
        setTask(tasks.map((task) => {
            if (task.id == id) {
                return { ...task, completed: !task.completed }
            } else {
                return task;
            }
        }))
    }

    return (
            <Table aria-label="basic table" variant='soft' sx={{ '& thead th:nth-child(1)': { width: '40%' }, maxWidth: '50%' }}>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr>
                            <td>{task.text}</td>
                            <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
                            <td>
                                <Button variant='solid' color='success' onClick={() => markCompleted(task.id)}>{task.completed ? 'In progress' : 'Done'}</Button>
                                <Button variant='solid' color='danger' onClick={() => deleteTask(task.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    )
}

export default TodoList;