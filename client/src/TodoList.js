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
        <table>
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
                        <td>{String(task.completed)}</td>
                        <td>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                            <button onClick={() => markCompleted(task.id)}>{task.completed ? 'In progress': 'Done'}</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TodoList;