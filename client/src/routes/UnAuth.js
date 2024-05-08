import React, { useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { Link, useNavigate } from 'react-router-dom';


const UnAuth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => { navigate('/login') }, 10000);

    })
    return (
        <Container>
            <Row>
                <Col className='mx-auto my-3 col-12'>
                    <h1 className="display-3">401 | Unauthorized</h1>
                    <Link to='/login'>Back to Login / Signup page</Link>
                    <p><br />This page will automatically redirect in 10 seconds.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default UnAuth