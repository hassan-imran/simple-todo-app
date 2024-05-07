import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const auth = useSelector((state) => state.auth.value);
  return (
    <Container>
      <Row>
        <Col className='mx-auto my-3 col-12'>
          <h1 className="display-3">404 | Not Found</h1>
          <p>Oops! We couldn't find what you're looking for. 😔
            <br />
            <br />
            Here's the link to go back to the {auth ? <Link to='/'>Home Page</Link> : <Link to='/login'>Login Page</Link>}
          </p>

        </Col>
      </Row>
    </Container>
  )
}

export default NotFound