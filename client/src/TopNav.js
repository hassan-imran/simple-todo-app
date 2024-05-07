import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateAuth } from './store/authSlice';


const TopNav = () => {
  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(updateAuth(false));
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Simple Todo App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-2">
            <Navbar.Text><Link to="/">Home</Link></Navbar.Text>
          </Nav>
          <Nav className="me-2">
            <Navbar.Text><Link to="/about">About</Link></Navbar.Text>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">

          {auth ? <Navbar.Text>Signed in as {auth} <Button className="btn-danger" onClick={(e) => logoutHandler(e)}>Logout</Button></Navbar.Text> : ``}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNav