import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Container, Navbar, Form, Button, Row, Col, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

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

    const location = useLocation()
    const user = location.state.user
    
    useEffect(() => {
        fetch('http://localhost:3000/user_main')
        .then((response) => response.json())
        .then((data) => setNumberList(data));
    }, []);

    const addnumber = () => {
        axios.post('http://localhost:5000/create', {
            huainumber: huainumber,
            head: head,
            tail: tail,
            toadhead: toadhead,
            toadtail: toadtail,
            top: top,
            bottom: bottom,
            fourtimes: fourtimes
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
                    fourtimes: fourtimes
                }
            ])
        })
    }

    return (
        <div>
            {/* navbar */}
            <Container>
                <Navbar className="bg-light">
                    <Container>
                        <Navbar.Brand>โปรแกรมคัดหวย</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: {user}
                            </Navbar.Text>
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
                    <Container className='d-flex justify-content-center'>
                        <Button type="submit" onClick={addnumber}>เพิ่ม</Button>
                    </Container>
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
                            <th>วันที่เพิ่ม</th>
                        </tr>
                    </thead>
                    <tbody >
                        {numberList.map((item) => (
                            <tr key={item.id}>
                                <th>{item.number}</th>
                                <td>{item.head}</td>
                                <td>{item.tail}</td>
                                <td>{item.toadhead}</td>
                                <td>{item.toadtail}</td>
                                <td>{item.top}</td>
                                <td>{item.bottom}</td>
                                <td>{item.fourtimes}</td>
                                <td>{item.addwhen}</td>
                            </tr>
                        ))}
                        </tbody>
                </Table>
            </Container>

        </div>
    )
}

export default User_main
