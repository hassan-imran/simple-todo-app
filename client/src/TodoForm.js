import React, { useState } from 'react';
import { Button, FormHelperText, Input } from '@mui/joy';
import { InfoOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { add } from './store/todo/task';

const TodoForm = () => {

    const [text, setText] = useState('');
    const [error, setError] = useState('');
    // const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const addError = (errorText) => {
        return (
            <FormHelperText sx={{ color: '#c41c1c', marginTop: '1em' }}>
                <InfoOutlined />
                {errorText}
            </FormHelperText>
        )
    }

    const handleAddTask = (text) => {
        if (text) {
            dispatch(add(text));
            setText('');
        } else {
            setError('Please enter task first!')
        }

    }

    return (<div>
        <Input
            color='neutral'
            endDecorator={<Button variant='solid' color='primary' onClick={() => handleAddTask(text)}>Add</Button>}
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