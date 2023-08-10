import { React, useState, useEffect } from "react";
import { Navbar, Container, Nav, Table, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Check_user() {

    const [userList, setUserList] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/check_user')
        .then((response) => response.json())
        .then((data) => setUserList(data));
    }, []);

    const handleDelete = async(id) => {
        try{
            await axios.post('http://localhost:5000/delete_user', {id: id})
            window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }

    return(
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

            {/* show data */}
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>username</th>
                            <th>password</th>
                            <th>roll</th>
                        </tr>
                    </thead>
                    <tbody >
                        {userList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.username}</td>
                                <td>{item.password}</td>
                                <td>{item.roll}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(item.id)}>ลบ</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Check_user