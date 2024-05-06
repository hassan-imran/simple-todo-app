import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const TopNav = () => {
  const auth = useSelector((state) => state.auth.value);
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

          {auth ? <Navbar.Text><a href="#login">Logout</a></Navbar.Text> : ``}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TopNav