import { React, useState, useEffect } from "react";
import { Navbar, Container, Nav, Table, Form, InputGroup, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Swal from 'sweetalert2'


function Record() {

    const [numberList, setNumberList] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/user_main')
        .then((response) => response.json())
        .then((data) => setNumberList(data));
    }, []);

    const handleDelete = async() => {
        Swal.fire({
            title: 'ลบข้อมูล',
            text: "คุณต้องการจะลบข้อมูลนี้ใช่ไหม",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ยกเลิก',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
                try{
                    axios.post('http://localhost:5000/delete_all')
                    window.location.reload()
                } catch(err) {
                    console.log(err)
                }
            }
        })
    }

    const [search, setSearch] = useState('')


    return (
        <div>
            {/* navbar */}
            <Container>
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/Admin_main">โปรแกรมคัดหวย</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/Create_user">สร้างผู้ใช้งาน</Nav.Link>
                            <Nav.Link href="/Check_user">ดูข้อมูลผู้ใช้งาน</Nav.Link>
                            <Nav.Link href="/User_main/admin">กรอกข้อมูล</Nav.Link>
                            <Nav.Link href="/Record">บันทึกการกรอกข้อมูล</Nav.Link>
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
                <Table className="d-flex justify-content-center">
                    <tr>
                        <th>
                            <Form>
                                <InputGroup className='my-3'>
                                    <Form.Control placeholder='ค้นหา' onChange={e => setSearch(e.target.value)}/>
                                </InputGroup>
                            </Form>
                        </th>
                        <th>
                            <Button variant="danger" onClick={() => handleDelete()}>ลบข้อมูลทั้งหมด</Button>
                        </th>
                    </tr>
                </Table>
            </Container>

            {/* show data */}
            <Container>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>เลข</th>
                            <th>หัว</th>
                            <th>ท้าย</th>
                            <th>โต้ดหัว</th>
                            <th>โต้ดท้าย</th>
                            <th>บน</th>
                            <th>ล่าง</th>
                            <th>4 ครั้ง</th>
                            <th>เพิ่มโดย</th>
                            <th>วันที่เพิ่ม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {numberList.filter((item) => {
                            return search === '' ? item : item.number.includes(search) || item.addby.includes(search)
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
                                <td>{item.addby}</td>
                                <td>{item.addwhen}</td>
                            </tr>
                        ))}
                        </tbody>
                </Table>
            </Container>
        </div>

    )
}

export default Record