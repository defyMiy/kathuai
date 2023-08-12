import { React, useState, useEffect } from 'react'
import { Container, Navbar, Form, Button, Row, Col, Table, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams, Link } from 'react-router-dom';

function User_main() {

    const [huainumber, sethuainumber] = useState(0)
    const [head, sethead] = useState(0)
    const [tail, settail] = useState(0)
    const [toadhead, settoadhead] = useState(0)
    const [toadtail, settoadtail] = useState(0)
    const [top, settop] = useState(0)
    const [bottom, setbottom] = useState(0)
    const [fourtimes, setfourtimes] = useState(0)

    const [numberList, setNumberList] = useState([])
    const param = useParams()

    useEffect(() => {
        fetch('http://localhost:5000/user_main')
        .then((response) => response.json())
        .then((data) => setNumberList(data));
    }, []);

    const addnumber = () => {
        if(huainumber === null) {
            alert('กรุณากรอกข้อมูล เลขหวย และ ผู้ใช้งาน')
        } else {
            axios.post('http://localhost:5000/create', {
                huainumber: huainumber,
                head: head,
                tail: tail,
                toadhead: toadhead,
                toadtail: toadtail,
                top: top,
                bottom: bottom,
                fourtimes: fourtimes,
                addby: param.id
            }).then(() => {
                setNumberList([
                    ...numberList,
                    {
                        huainumber: huainumber,
                        head: head,
                        tail: tail,
                        toadhead: toadhead,
                        toadtail: toadtail,
                        top: top,
                        bottom: bottom,
                        fourtimes: fourtimes,
                        addby: param.id
                    }
                ])
            })
        }
    }

    const handleDelete = async(id) => {
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
                    axios.post('http://localhost:5000/delete', {id: id})
                    window.location.reload()
                } catch(err) {
                    console.log(err)
                }
            }
        })    
    }

    return (
        <div>
            {/* navbar */}
            <Container>
                <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>โปรแกรมคัดหวย</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">{param.id === "admin" ? <Link to={"/Admin_main"}>กลับสู่หน้าแอดมิน</Link> : console.log(param.id)}</Nav>
                        <Nav>
                            <Navbar.Text>Sign in as : {param.id}</Navbar.Text>
                            <Nav.Link href="/">Logout</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
            
            {/* add data */}
            <Container className='p-3'>
                <Form>
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId="huainumber">
                            <Form.Control required type="number" placeholder="เลขหวย" onChange={(event) => {
                                sethuainumber(event.target.value)
                            }}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="fourtimes">
                            <Form.Control type="number" placeholder="4 ครั้ง" onChange={(event) => {
                                setfourtimes(event.target.value)
                            }}/>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId="head">
                            <Form.Control type="number" placeholder="หัว" onChange={(event) => {
                                sethead(event.target.value)
                            }}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="tail">
                            <Form.Control type="number" placeholder="ท้าย" onChange={(event) => {
                                settail(event.target.value)
                            }}/>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId="toadhead">
                            <Form.Control type="number" placeholder="โต้ดหัว" onChange={(event) => {
                                settoadhead(event.target.value)
                            }}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="toadtail">
                            <Form.Control type="number" placeholder="โต้ตท้าย" onChange={(event) => {
                                settoadtail(event.target.value)
                            }}/>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col} controlId="top">
                            <Form.Control type="number" placeholder="บน" onChange={(event) => {
                                settop(event.target.value)
                            }}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="bottom">
                            <Form.Control type="number" placeholder="ล่าง" onChange={(event) => {
                                setbottom(event.target.value)
                            }}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} className='d-flex justify-content-center'>
                            <Button variant="success" type="submit" size='lg' onClick={addnumber}>เพิ่ม</Button>
                        </Form.Group>
                    </Row>
                </Form>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {numberList.filter((item) => item.addby.includes(param.id)).map((item) => (
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

export default User_main
