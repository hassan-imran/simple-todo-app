import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAuth } from '../store/authSlice';
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [tab, setTab] = useState(0);
    let [loginTab, registerTab] = '';

    const [loginUsername, setLoginUserName] = useState('');
    const [loginPass, setLoginPass] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPass, setRegisterPass] = useState('');

    const handleSubmit = (e, eventType) => {
        e.preventDefault();
        if (eventType === 'login') {
            axios.post('http://localhost:8000/login', { userName: loginUsername, password: loginPass })
                .then((result) => {
                    if (result.data === "Success") {
                        console.log(result);
                        setLoginUserName('');
                        setLoginPass('');
                        dispatch(updateAuth(true));
                        navigate('/');
                    } else {
                        console.log(result.data)
                    }
                })
                .catch(err => console.log(err));
        } else {
            axios.post('http://localhost:8000/signup', { name: registerName, userName: registerUsername, password: registerPass })
                .then((result) => {
                    console.log(result);
                    setRegisterName('');
                    setRegisterUsername('');
                    setRegisterPass('');
                    navigate('/login');
                    setTab(0);
                })
                .catch(err => console.log(err));
        }
    };



    if (!tab) {
        loginTab = 'bg-primary';
        registerTab = 'bg-secondary';
    } else {
        loginTab = 'bg-secondary';
        registerTab = 'bg-primary';
    }
    return (
        <Container>
            <Row xs={3} md={3} lg={3} className="justify-content-md-center mt-5">
                <Col style={{ background: '#f6f7f8', borderRadius: '0.5em' }} className='p-0 shadow'>
                    <Nav variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link className={loginTab} style={{ color: '#FFF' }} onClick={() => setTab(0)}>Sign In</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className={registerTab} style={{ color: '#FFF' }} onClick={() => setTab(1)}>Register</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {!tab ? <>
                        <Form className='p-3'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" value={loginUsername} onChange={e => setLoginUserName(e.target.value)} />
                                <Form.Text className="text-muted">
                                    Make sure it does not contain spaces.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="username-signin">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={e => handleSubmit(e, 'login')}>
                                Login
                            </Button>
                        </Form>
                    </> : <>
                        <Form className='p-3'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Your Name" value={registerName} onChange={e => setRegisterName(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your information with anyone else. So chill..
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="username-signup">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} />
                                <Form.Text className="text-muted">
                                    Make sure it does not contain spaces.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={registerPass} onChange={e => setRegisterPass(e.target.value)} />
                            </Form.Group>
                            <Button variant="success" type="submit" onClick={e => handleSubmit(e, 'register')}>
                                Register
                            </Button>
                        </Form>
                    </>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default SignIn