import React, { useState } from 'react';
import { Button, FormHelperText, Input } from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material'

const TodoForm = ({ tasks, setTask }) => {

    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const addError = (errorText) => {
        return (
            <FormHelperText sx={{ color: '#c41c1c', marginTop: '1em' }}>
                <InfoOutlined />
                {errorText}
            </FormHelperText>
        )
    }

    function addTask(text) {
        if (text) {
            const newTask = {
                id: Date.now(),
                text,
                completed: false,
            }
            setTask([...tasks, newTask]);
            setText('');
        } else {
            setError('Please enter task first!');
        }
    }

    return (<div>
        <Input
            color='neutral'
            endDecorator={<Button variant='solid' color='primary' onClick={() => addTask(text)}>Add</Button>}
            placeholder='Enter task details here'
            type="text"
            value={text}
            onChange={(e) => {
                setText(e.target.value);
                if (error) {
                    setError('')
                }
            }}
            sx={{ padding: '12px 20px' }}
        />
        {error ? addError(error) : ''}
    </div>)
}
export default TodoForm;