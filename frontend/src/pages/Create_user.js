import { React, useState} from "react"
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Create_user() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')


    function handleSubmit(event) {
        if(password1 !== password2) {
            event.preventDefault()
            alert("รหัสผ่านไม่ตรงกัน")
        } else {
            event.preventDefault()
            axios.post('http://localhost:5000/create_user', { username, password1 })
            .then((res) => {
                console.log(res)
                if(res.data.data === 'Values Inserted'){
                    navigate('/Admin_main')
                }
            })
            .catch(err => console.log(err))
        }
        
    }

    return (
        <div>
            {/* navbar */}
            <Container>
                <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/Admin_main">โปรแกรมคัดหวย</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/Create_user">สร้างผู้ใช้งาน</Nav.Link>
                            <Nav.Link href="/Check_user">ดูข้อมูลผู้ใช้งาน</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/">Logout</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>

            <Container className='position-absolute top-50 start-50 translate-middle bg-light p-5'>
                <Form onSubmit={handleSubmit}>
                    <h3 className='d-flex justify-content-center p-3'>สมัครผู้ใช้งาน</h3>
                    <Form.Group className="mb-3">
                        <Form.Label>Username (มากสุด 10 ตัวอักษร)</Form.Label>
                        <Form.Control required type="text" placeholder="Username" maxLength={10} onChange = { e => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password (มากสุด 10 ตัวอักษร)</Form.Label>
                        <Form.Control required type="text" placeholder="Password" maxLength={10} onChange = { e => setPassword1(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>ใส่รหัสผ่านอีกรอบ</Form.Label>
                        <Form.Control required type="text" placeholder="Password" maxLength={10} onChange = { e => setPassword2(e.target.value)}/>
                    </Form.Group>
                    <Container className='d-flex justify-content-center'>
                        <Button variant="primary" type="submit">
                            สมัครผู้ใช้งาน
                        </Button>
                    </Container>
                </Form>
            </Container>    
        </div>
        
    )
}

export default Create_user