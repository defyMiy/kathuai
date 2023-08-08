import React, { useState } from 'react'
import { Button, Form, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

    
function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:5000/login', { username, password }).then(res => console.log(res)).catch(err => console.log(err))
    }
    return (
        <Container className='position-absolute top-50 start-50 translate-middle bg-light p-5'>
            <Form onSubmit={handleSubmit}>
                <h3 className='d-flex justify-content-center p-3'>เข้าสู่ระบบ</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" onChange = { e => setUsername(e.target.value)}/>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange = { e => setPassword(e.target.value)}/>
                </Form.Group>
                <Container className='d-flex justify-content-center'>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Container>
            </Form>
        </Container>
    )
}

export default Login