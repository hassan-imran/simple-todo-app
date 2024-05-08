import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'

const About = () => {
  return (
    <Container>
      <Row>
        <Col className='mx-auto my-3 col-12'>
          <h1 className="display-3">About</h1>
          <hr />
          <p>This is a simple Todo app.</p>

          <h1 className='display-6'>Frontend</h1>
          <p>The front-end is built using:
          </p>
          <ul>
            <li>ReactJS</li>
            <li>React Bootstrap (for styling)</li>
            <li>React Router DOM (for front-end routing)</li>
            <li>Redux Toolkit aka RTK (For state management)</li>
            <li>Axios (for making server requests)</li>
          </ul>

          <h1 className='display-6'>Backend</h1>
          <p>The back-end is built using:
          </p>
          <ul>
            <li>NodeJS</li>
            <li>ExpressJS</li>
            <li>Cors (to avoid the cross-origin request errors)</li>
            <li>Axios (for making server requests)</li>
            <li>Dotenv (for storing keys and other secrets)</li>
            <li>Bcrypt (for encrypting passwords before storing them online)</li>
            <li>MongoDB (for storing data)</li>
            <li>Mongoose (for writing code for MongoDB)</li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default About