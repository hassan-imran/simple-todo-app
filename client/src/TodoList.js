import { Table, Button, Checkbox } from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTask } from './store/todo/task';

const TodoList = () => {

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

    const checkboxGenerator = (taskId) => {
        return (
            <Checkbox
                label={tasks[taskId].completed ? "Completed" : "In Progress"}
                checked={tasks[taskId].completed}
                onChange={() => dispatch(toggleComplete(taskId))}
            />
        );
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
                {Object.keys(tasks).map(taskId => {
                    const task = tasks[taskId];
                    return (
                        <tr key={taskId}>
                            <td>
                                {!task.completed ? task.text : <span className='completed-strike'>{task.text}</span>}
                            </td>
                            <td className='checkbox-col'>
                                {checkboxGenerator(taskId)}
                            </td>
                            <td className='action-col'>
                                {/* <Button variant='solid' color='primary' onClick={() => toggleStatus(taskId)}>{task.completed ? 'In progress' : 'Done'}</Button> */}
                                <Button variant='solid' color='danger' onClick={() => dispatch(deleteTask(taskId))}>Delete</Button>
                            </td>
                        </tr>
                    );
                })}

            </tbody>
        </Table>
    )
}

export default TodoList;