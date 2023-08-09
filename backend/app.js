const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kathuai'
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?"
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.json('Login Failed')
        if(data.length > 0){
            if(req.body.username === 'admin') {
                return res.json({ data:'Login Successfully as admin', usertype:req.body.username })
            } else {
                return res.json({ data:'Login Successfully as user', usertype:req.body.username })
            }
        } else {
            return res.json('No Record')
        }
    })
})

app.get('/user_main', (req, res) => {
    db.query("SELECT * FROM numberdata", (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/create', (req, res) => {
    const huainumber = req.body.huainumber
    const head = req.body.head
    const tail = req.body.tail
    const toadhead = req.body.toadhead
    const toadtail = req.body.toadtail
    const top = req.body.top
    const bottom = req.body.bottom
    const fourtimes = req.body.fourtimes
    const addby = 'user1'
    const addwhen = new Date()

    db.query("INSERT INTO numberdata (number, head, tail, toadhead, toadtail, top, bottom, fourtimes, addby, addwhen) VALUES(?,?,?,?,?,?,?,?,?,?)",
    [huainumber, head, tail, toadhead, toadtail, top, bottom, fourtimes, addby, addwhen],
    (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send('Values Inserted')
        }
    })
})

app.get('/', function(req, res, next) {
    res.send("Hello world");
});

app.listen(5000, () => {
    console.log('server started on port 5000')
})