import { React, useState, useEffect } from "react";
import { Navbar, Container, Nav, Table, Form, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin_main() {

    const [numberList, setNumberList] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/admin_main')
        .then((response) => response.json())
        .then((data) => setNumberList(data));
    }, []);

    const [search, setSearch] = useState('')

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

            {/* search bar */}
            <Container>
                <Form>
                    <InputGroup className='my-3'>
                        <Form.Control placeholder='ค้นหาเลข' onChange={(e) => setSearch(e.target.value)}/>
                    </InputGroup>
                </Form>
            </Container>

            {/* show data */}
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>เลข</th>
                            <th>หัว</th>
                            <th>ท้าย</th>
                            <th>โต้ดหัว</th>
                            <th>โต้ตท้าย</th>
                            <th>บน</th>
                            <th>ล่าง</th>
                            <th>4 ครั้ง</th>
                        </tr>
                    </thead>
                    <tbody >
                        {numberList.filter((item) => {
                            return search === '' ? item : item.number.includes(search)
                        }).map((item) => (
                            <tr key={item.id}>
                                <th>{item.number}</th>
                                <td>{item.head}</td>
                                <td>{item.tail}</td>
                                <td>{item.toadhead}</td>
                                <td>{item.toadtail}</td>
                                <td>{item.top}</td>
                                <td>{item.bottom}</td>
                                <td>{item.fourtimes}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Admin_main