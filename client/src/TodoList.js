import { Table, Button, Checkbox } from '@mui/joy';

const TodoList = ({ tasks, setTask }) => {

    const deleteTask = (id) => {
        setTask(tasks.filter(task => task.id !== id));
    };

    const checkboxGenerator = (task) => {
        return (
            <Checkbox
                label={task.completed ? "Completed" : "In Progress"}
                checked={task.completed}
                onChange={() => toggleStatus(task.id)}
            />
        );
    }

    const toggleStatus = (id) => {
        setTask(tasks.map((task) => {
            if (task.id == id) {
                // console.log({ ...task, completed: !task.completed })
                return { ...task, completed: !task.completed }
            } else {
                return task;
            }
        }))
    }

    return (
        <Table aria-label="basic table" variant='soft' sx={{ '& thead th:nth-child(1)': { width: '50%' }, maxWidth: '80%' }}>
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
                        <td>{!task.completed ? task.text : <span className='completed-strike'>{task.text}</span>}</td>
                        <td className='checkbox-col'>{checkboxGenerator(task)}</td>
                        <td className='action-col'>
                            {/* <Button variant='solid' color='primary' onClick={() => toggleStatus(task.id)}>{task.completed ? 'In progress' : 'Done'}</Button> */}
                            <Button variant='solid' color='danger' onClick={() => deleteTask(task.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default TodoList;