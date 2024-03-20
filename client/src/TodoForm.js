import React, { useState } from 'react';

const TodoForm = ({tasks, setTask}) => {
   
    const [text, setText] = useState('');

    function addTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
        }
        setTask([...tasks, newTask]);
        setText('');
    }

    return (<div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => addTask(text)}>Add Task</button>
    </div>)
}

export default TodoForm;